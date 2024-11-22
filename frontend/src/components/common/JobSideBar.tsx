import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {IJob} from '@/types/IJob';
import {applyJob} from '@/api/jobsApi'; 
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import toast from 'react-hot-toast'
import {IApplication} from '@/types/IApplication';
import { AxiosError } from "axios";

interface JobSideBarProps {
    job: IJob;
    sheetOpen: boolean;
    setSheetOpen: (open: boolean) => void;
}

const JobSideBar: React.FC<JobSideBarProps> = ({ job, sheetOpen, setSheetOpen }) => {
    const { userInfo } = useSelector((state: RootState) => state.user);

    const applicationData: IApplication = {
        jobId: job._id!,
        clientId: job.clientId,
        freelancerId: userInfo._id,
    };

    const handleJobApply= async()=>{
        try{
            await applyJob(applicationData);
            toast.success("Your application has sent successfully");
        }catch(error){
            console.log('Error in apply job:',error);
            const axiosError = error as AxiosError;
             const data = axiosError.response?.data as { message: string };
            toast.error(data?.message || 'An error occurred');
        }
    }

    return (
        <div>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="w-full max-w-[90vw] sm:max-w-[800px] " side="right" forceMount>
                    <SheetHeader className="p-6 border-b">
                        <SheetTitle>{job.jobTitle}</SheetTitle>
                        <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                            <span>
                                {job.category} / {job.subCategory}
                            </span>
                            <span>Budget: ${job.budget}</span>
                        </div>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-10rem)] mt-6 pr-4">
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2">Job Description</h3>
                                <p>{job.description}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Requirements</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {job.skillsRequired.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <SheetFooter className="mt-6 pt-6 border-t">
                            <Button onClick={handleJobApply}>Apply Now</Button>
                        </SheetFooter>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default JobSideBar;
