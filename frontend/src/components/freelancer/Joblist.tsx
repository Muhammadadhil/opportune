import { useJobs } from "@/hooks/jobs/useJobs";
import { IJob } from "@/types/IJob";
import Nojobs from "../ui/NoJob";
import SkeletonCard from "../common/LoadingSkelton";
import JobCard from '../common/JobCard';

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
                        jobs?.data?.map((job: IJob) => <JobCard job={job} key={job._id} />)
                    )}
                </ul>
            </div>
        
    );
};

export default JobList;
