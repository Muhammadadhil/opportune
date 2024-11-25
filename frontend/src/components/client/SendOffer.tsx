import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { Trash2 } from "lucide-react";
import {useJobDetails} from "@/hooks/jobs/useJobDetails";
import {useParams,useLocation} from 'react-router-dom'


interface Milestone {
    description: string;
    dueDate: string;
    amount: string;
}

export default function SendOffer() {

    const {jobId}=useParams();
    const { data: job } = useJobDetails(jobId!);

    const [milestones, setMilestones] = useState<Milestone[]>([{ description: "", dueDate: "", amount: "" }]);
    const [budget,setBudget]=useState(job?.data.budget);
    const [title,setTitle]=useState(job?.data.jobTitle);
    const [description,setDescription]=useState(job?.data.description);

    const location = useLocation();
    const { application } = location.state;

    console.log('job:',job);

    const addMilestone = () => {
        setMilestones([...milestones, { description: "", dueDate: "", amount: "" }]);
    };

    const removeMilestone = (index: number) => {
        setMilestones(milestones.filter((_, i) => i !== index));
    };

    const updateMilestone = (index: number, field: keyof Milestone, value: string) => {

        console.log("Index:", index);
        console.log("Field:", field);
        console.log("Value:", value);   

        const updatedMilestones = milestones.map((milestone, i) => {
            if (i === index) {
                return { ...milestone, [field]: value };
            }
            return milestone;
        });
        setMilestones(updatedMilestones);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Offer Data:", {
            milestones,
            budget,
            title,
            description
        });
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
                        <Input placeholder="Enter job description" className="mb-4 mt-1" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label>Description</label>
                        <Textarea placeholder="Enter job description" className="mb-4 mt-1 min-h-[150px]" value={description} onChange={(e) => setDescription(e.target.value)}/>

                        <label>budget $</label>
                        <Input placeholder="Enter job description" className=" mt-1 max-w-40" value={budget} onChange={(e) => setBudget(e.target.value)} />
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
                                        <Input type="date" value={milestone.dueDate} onChange={(e) => updateMilestone(index, "dueDate", e.target.value)} />
                                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
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
