import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {IJob} from '@/types/IJob';
import {useLocation} from 'react-router-dom';

export const JobDetail: React.FC = () => {
    
    const location = useLocation();
    const job: IJob = location.state?.job;

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl font-bold">{job.jobTitle}</CardTitle>
                            <CardDescription className="mt-1">
                                {job.category} / {job.subCategory}
                            </CardDescription>
                        </div>
                        <Badge variant={job.isActive ? "default" : "secondary"}>{job.isActive ? "Active" : "Inactive"}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6"> 
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                            <p className="text-gray-700">{job.description}</p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Budget</h3>
                            <p className="text-2xl font-bold text-green-600">${job.budget.toLocaleString()}</p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {job.skillsRequired.map((skill, index) => (
                                    <Badge key={index} variant="outline">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Search Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {job.searchTags.map((tag, index) => (
                                    <Badge key={index} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
