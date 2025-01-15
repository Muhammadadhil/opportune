import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { IJob } from "@/types/IJob";
import { useNavigate } from "react-router-dom";
interface JobPostingCardProps {
    job: IJob;
    // onDelete: (id: string) => void;
    // onEdit: (id: string) => void;
}

const JobCard: React.FC<JobPostingCardProps> = ({ job }) => {

   

    const navigate = useNavigate(); 
    return (
        <Card className="w-full max-w-[300px] min-w-[300px] min-h-[250px] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">{job.jobTitle}</CardTitle>
            </CardHeader>
            <CardDescription className="px-6 pb-2">
                {job.category} . {job.subCategory}
            </CardDescription>
            <CardContent className="mt-auto">
                <div className="space-y-4">
                    <div className=" ">
                        <Button className="bg-green-700 hover:bg-green-800" onClick={()=>navigate(`/cl/jobdetail/${job._id}`,{state:{job}})}>Review details</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default JobCard;
