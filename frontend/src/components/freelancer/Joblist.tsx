import { useJobs } from "@/hooks/jobs/useJobs";
import { IJob } from "@/types/IJob";
import Nojobs from "../ui/NoJob";
import SkeletonCard from "../common/LoadingSkelton";
import { Button } from "../ui/button";

const JobList = () => {
    const { data: jobs, isLoading } = useJobs();

    return (
        <div className="flex-grow p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4">Jobs you might like</h2>
            <ul className="space-y-4">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
                ) : jobs?.data?.length === 0 ? (
                    <Nojobs />
                ) : (
                    jobs?.data?.map((job: IJob, index) => (
                        <li key={job._id} className="bg-white p-4 rounded-lg border shadow-sm hover:bg-gray-50 transition-all duration-300 ease-in-out cursor-pointer">
                            <h3 className="font-bold text-lg mb-2 text-gray-700">{job.jobTitle}</h3>
                            <p className="text-gray-900 mb-2 text-sm">{job.subCategory}</p>
                            <p className="text-gray-600 mb-2 text-sm">{job.description}</p>

                            <div className="flex flex-wrap gap-2 mb-2">
                                {job.skillsRequired.map((skill, index) => (
                                    <span key={index} className="bg-zinc-100 text-gray-700 rounded-full px-3 py-1 text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between">
                                <span>Budget: ₹{job.budget}</span>
                                <span>Proposals: 5 to 10 </span>
                            </div>
                            <div className="w-full flex justify-end mt-3">
                                <Button variant="outline" className="w-28 ">
                                    apply
                                </Button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default JobList;
