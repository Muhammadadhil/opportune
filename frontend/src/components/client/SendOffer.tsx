import { useState,useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
// import { Calendar } from "lucide-react";
import { Trash2 } from "lucide-react";
import {useJobDetails} from "@/hooks/jobs/useJobDetails";
import {useParams,useLocation} from 'react-router-dom'
import { IOffer, IMilestone } from "@/types/IOffer";
import {sendOffer} from "@/api/jobsApi";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom';


export default function SendOffer() {

    const {jobId}=useParams();
    const { data: job } = useJobDetails(jobId!);

    console.log('job:',job?.data);

    const [budget,setBudget]=useState(job?.data.budget);
    const [title,setTitle]=useState(job?.data.jobTitle);
    const [description,setDescription]=useState(job?.data.description);
    const [milestones, setMilestones] = useState<IMilestone[]>([{ description: "", deadline: "", amount: budget }]);

    useEffect(() => {
        setTitle(job?.data.jobTitle);
        setDescription(job?.data.description);
        setBudget(job?.data.budget);
    }, [job]);

    const location = useLocation();
    const { application } = location.state;
    const navigate=useNavigate();

    const addMilestone = () => {
        const isValid = milestones.every((milestone) => milestone.description.trim() !== "" && milestone.deadline.trim() !== "");
        if (!isValid) {
            toast.error("Please fill all previous milestones");
            return;
        }

        const newMilestones = [...milestones, { description: "", deadline: "", amount: "" }];
        setMilestones(splitBudget(newMilestones));
    };

    const removeMilestone = (index: number) => {
        const updatedMilestones = milestones.filter((_, i) => i !== index);
        setMilestones(splitBudget(updatedMilestones));
    };

    const splitBudget = (milestones: IMilestone[]): IMilestone[] => {
        const amountPerMilestone = budget && milestones.length > 0 ? (parseFloat(budget) / milestones.length) : "0.00";
        return milestones.map((milestone) => ({
            ...milestone,
            amount: amountPerMilestone,
        }));
    };

    useEffect(() => {
        if (milestones.length > 0) {
            setMilestones(splitBudget(milestones));
        }
    }, [budget, milestones.length]);

    const updateMilestone = (index: number, field: keyof IMilestone, value: string) => {
        const updatedMilestones = milestones.map((milestone, i) => {
            if (i === index) {
                return { ...milestone, [field]: value };
            }
            return milestone;
        });
        setMilestones(updatedMilestones);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValidMilestones = milestones.every(milestone => milestone.description.trim() !== "" && milestone.deadline.trim() !== "" );
        const isValid = title.trim() !== "" && description.trim() !== "" && budget !== ""  && isValidMilestones;
        if (!isValid) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const data: IOffer = {
                applicationId: application._id,
                jobId: jobId!,
                freelancerId: application.freelancerId,
                clientId: application.clientId,
                milestones,
                totalAmount: budget,
            };

            const response = await sendOffer(data);
            console.log('response in sending offer:',response);
            navigate('/offer-success',{state:{message:"Offer Sent Successfully!",redirectPath:"/cl/dashboard",redirectTime:3000}})
        } catch (error) {
            console.log("Error in sending offer:", error);
            toast.error('Error in sending offer');
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Send Offer</h1>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Work Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <label>Title</label>
                        <Input placeholder="Title" className="mb-4 mt-1" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label>Description</label>
                        <Textarea placeholder="Job description" className="mb-4 mt-1 min-h-[150px]" value={description} onChange={(e) => setDescription(e.target.value)}/>

                        <label>budget $</label>
                        <Input placeholder="budget" className=" mt-1 max-w-40" value={budget} onChange={(e) => setBudget(e.target.value)} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Project Milestones</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <p className="text-sm text-muted-foreground">Add project milestones and pay in installments as each milestone is completed to your satisfaction.</p>

                        {milestones.map((milestone, index) => (
                            <div key={index} className=" grid gap-4 md:grid-cols-12 items-start">
                                <div className="space-y-2 md:col-span-6">
                                    <label className="text-sm font-medium">{index + 1}. Milestone description</label>
                                    <Input placeholder="What is the task?" value={milestone.description} onChange={(e) => updateMilestone(index, "description", e.target.value)} />
                                </div>

                                <div className="space-y-2 md:col-span-3">
                                    <label className="text-sm font-medium">Due date (optional)</label>
                                    <div className="relative">
                                        <Input type="date" value={milestone.deadline} onChange={(e) => updateMilestone(index, "deadline", e.target.value)} />
                                        {/* <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" /> */}
                                    </div>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium">Deposit amount</label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={milestone.amount}
                                            onChange={(e) => updateMilestone(index, "amount", e.target.value)}
                                            className="pl-6"
                                        />
                                        <span className="absolute left-2 top-2.5">$</span>
                                    </div>
                                </div>
                                <div className="mt-8  md:col-span-1">
                                    {milestones.length > 1 && (
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeMilestone(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}

                        <Button type="button" variant="outline" onClick={addMilestone} className="mt-4">
                            Add milestone
                        </Button>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" className="w-full sm:w-auto bg-green-700" onClick={handleSubmit}>
                        Send Offer
                    </Button>
                </div>
            </div>
        </div>
    );
}


