import React from "react";
import { FreelancerCard } from "@/components/freelancer/freelancerCard";
import { useFreelancersList } from "@/hooks/user/useFreelancersList";

const Freelancer: React.FC = () => {

    const {data:freelancers} = useFreelancersList()

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-4 space-y-4 max-w-[1200px]">
                <h1 className="text-2xl font-bold mb-6 flex justify-items-center text-gray-600 mt-10 tracking-tight">Available Freelancers</h1>
                {freelancers?.map((freelancer: any, index: number) => (
                    <FreelancerCard key={index} userInfo={freelancer.userInfo} freelancerInfo={freelancer.freelancerDetails} />
                ))}
            </div>
        </div>
    );
};

export default Freelancer;
