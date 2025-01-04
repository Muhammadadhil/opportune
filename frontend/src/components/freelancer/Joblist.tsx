import { useState, useEffect } from "react";
import { useFilterJobs } from "@/hooks/jobs/useFilterJobs";
import { IJob } from "@/types/IJob";
import Nojobs from "../ui/NoJob";
import SkeletonCard from "../common/LoadingSkelton";
import JobCard from "../common/JobCard";
import { Button } from "@/components/ui/button";
import { getPaginationNumbers } from "@/utils/getPageNumbers";        
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const JobList = ({ filters }: { filters?: any }) => {
    
    const {userInfo} = useSelector((state: RootState) => state.user);

    const [page, setPage] = useState(1);
    const [totalPages,setTotalPages]=useState(1);
    const limit = 3;

    const { data: jobs, isLoading ,refetch} = useFilterJobs(filters, page, limit);  

    const [jobss,setJobss] = useState<IJob[]>([]);
    
    useEffect(() => {
        const jobss = jobs?.data?.jobs?.map((job: IJob) => {
            console.log(job);
            if (job.applicants?.includes(userInfo?._id || '')) {
                return {
                    ...job,
                    isApplied: true,
                };
            }else{
                return {
                    ...job,
                    isApplied: false,
                };
            }
        });

        setJobss(jobss);
    }, [jobs]);


    console.log('check applied jobss::',jobss);


    useEffect(() => {
        setTotalPages(jobs?.data?.totalPages);
    }, [jobs]);
    
    
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const getPageNumbers = () => {
        return getPaginationNumbers(totalPages, page);
    };

    return (
        <>
            <ul className="space-y-4">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
                ) : jobs?.data?.length === 0 ? (
                    <Nojobs />
                ) : (
                    jobss?.map((job: IJob) => <JobCard job={job} key={job._id} onApply={refetch} />)
                )}
            </ul>

            {!isLoading && (
                <div className="flex items-center justify-center mt-8">
                    <nav className="flex items-center space-x-2" aria-label="Pagination">
                        <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-2 py-1 rounded-md bg-white text-gray-500 border border-gray-300 hover:bg-gray-50">
                            Previous
                        </Button>

                        {getPageNumbers().map((pageNumber, index) => (
                            <Button
                                key={index}
                                onClick={() => typeof pageNumber === "number" && handlePageChange(pageNumber)}
                                className={`px-3 py-1 rounded-md ${pageNumber === page ? "bg-black text-white" : "bg-white text-gray-500 border border-gray-300 hover:bg-gray-50"} ${
                                    pageNumber === "..." ? "cursor-default" : ""
                                }`}
                                disabled={pageNumber === "..."}
                            >
                                {pageNumber}
                            </Button>
                        ))}

                        <Button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className="px-2 py-1 rounded-md bg-white text-gray-500 border border-gray-300 hover:bg-gray-50"
                        >
                            Next
                        </Button>
                    </nav>
                </div>
            )}
        </>
    );
};

export default JobList;
