import { useFilterJobs } from "@/hooks/jobs/useFilterJobs";
import { IJob } from "@/types/IJob";
import Nojobs from "../ui/NoJob";
import SkeletonCard from "../common/LoadingSkelton";
import JobCard from '../common/JobCard';

const JobList = ({ filters }:{filters?:any}) => {
    const { data: jobs, isLoading } = useFilterJobs(filters);

    console.log('jobs from filterjob :',jobs);

    return (
        <ul className="space-y-4">
            {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
            ) : jobs?.data?.length === 0 ? (
                <Nojobs />
            ) : (
                jobs?.data?.map((job: IJob) => <JobCard job={job} key={job._id} />)
            )}
        </ul>
    );
};

export default JobList;
