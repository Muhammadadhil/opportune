import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface JobPosting {
    id: string;
    jobTitle: string;
    category: string;
    subCategory: string;
    skillsRequired: string[];
    description: string;
    budget: string;
    searchTags: string[];
}

interface JobPostingCardProps {
    job: JobPosting;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

const JobCard: React.FC = () => {
    return (
        <Card className="w-full max-w-[300px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">
                    title
                </CardTitle>
                
            </CardHeader>
            <CardDescription className="px-6 pb-2">
                category
            </CardDescription>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-1">Skills Required:</h3>
                        <div className="flex flex-wrap gap-2">
                            {/* {job.skillsRequired.map((skill, index) => (
                                <Badge key={index} variant="secondary">
                                    {skill}
                                </Badge>
                            ))} */}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Description:</h3>
                        <p className="text-sm text-gray-600">dfasdfas</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold mb-1">Budget:</h3>
                            <p className="text-lg font-bold text-green-600">asdasd</p>
                        </div>
                        
                    </div>
                </div>
            </CardContent>
            
        </Card>
    );
};

export default JobCard;
