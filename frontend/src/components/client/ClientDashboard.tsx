import React from "react";
import { Card, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";

const jobs = [
    {
        title: "Web Socket MERN Stack",
        description: "I need someone to configure Socket.io...",
        skills: ["Node.js", "React", "ExpressJS", "MongoDB"],
        price: "$10",
        proposals: "10 to 15",
    },
    {
        title: "React/React Native Developer",
        description: "Looking for a developer for mobile and web...",
        skills: ["React", "React Native", "TypeScript"],
        price: "$700 ",
        proposals: "5 to 10",
    },
    {
        title: "Flutter Developer",
        description: "Looking for a developer for mobile and web...",
        skills: ["Flutter", "Dart", "Firebase"],
        price: "$700 ",
        proposals: "5 to 10",
    },
    {
        title: "PHP Developer",
        description: "Looking for a developer for mobile and web...",
        skills: ["PHP", "MySQL", "Laravel"],
        price: "$700 ",
        proposals: "5 to 10",
    },
];

const ClientDashboard: React.FC = () => {
    return (
        <div className="">
            <div className="flex md:px-36 container flex-col md:flex-row  mt-16">
                <Link to="/cl/postjob">
                    <Card className="min-w-80 max-w-80 h-28 hover:shadow-lg hover:bg-gray-100 bg-gray-50 rounded-xl mr-9 shadow-md  border flex flex-col items-center justify-center">
                        <CardTitle className="text-xl font-bold text-center text-gray-700 static">Post a job</CardTitle>

                        <p className="text-sm mt-3">Connect with talents and collaborate</p>
                    </Card>
                </Link>

                <Card className="min-w-80 max-w-80 h-28 hover:shadow-lg hover:bg-gray-100 bg-gray-50 rounded-xl mr-9 shadow-md border flex flex-col items-center justify-center">
                    <CardTitle className="text-xl font-bold text-center text-gray-700">Hire talents directly</CardTitle>
                    <p className="text-sm mt-3">Connect with talents and collaborate</p>
                </Card>
            </div>

            {/* <div className="">
                <Card className="min-w-40 max-w-40 h-28 bg-gray-50 rounded-xl mr-9 shadow-md border flex flex-col items-center justify-center">
                    <CardTitle className="text-xl font-bold text-center text-gray-700"></CardTitle>
                    <CardContent></CardContent>
                </Card>
            </div> */}

            <div className="flex md:px-36 container flex-col md:flex-row mt-16">
                <div className="w-full md:w-12/12 order-2 lg:order-1">
                    <div className="flex-grow p-4 md:p-6">
                        <h2 className="text-xl font-semibold mb-4">Jobs you might like</h2>
                        <ul className="space-y-4">
                            {jobs.map((job, index) => (
                                <li key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                                    <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                                    <p className="text-gray-600 mb-2">{job.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {job.skills.map((skill, idx) => (
                                            <span key={idx} className="bg-zinc-100 text-gray-700 rounded-full px-3 py-1 text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between">
                                        <span>Budget: {job.price}</span>
                                        <span>Proposals: {job.proposals}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
