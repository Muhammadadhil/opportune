
import { useState, useEffect } from "react";
import { useFilterJobs } from "@/hooks/jobs/useFilterJobs";
import { IJob } from "@/types/IJob";
import Nojobs from "../ui/NoJob";
import SkeletonCard from "../common/LoadingSkelton";
import JobCard from "../common/JobCard";
import { Button } from "@/components/ui/button";

const JobList = ({ filters }: { filters?: any }) => {
    const [page, setPage] = useState(1);
    const [totalPages,setTotalPages]=useState(1);
    const limit = 3;

    const { data: jobs, isLoading } = useFilterJobs(filters, page, limit);

    // console.log('jobs:', jobs);


    useEffect(() => {
        setTotalPages(jobs?.data?.totalPages);
    }, [jobs]);
    
    
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const getPageNumbers = () => {
        
        const pages = [];
        const maxVisiblePages = 8;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            let start = Math.max(2, page - 2);
            let end = Math.min(totalPages - 1, page + 2);

            if (page <= 3) {
                end = 5;
            }

            if (page >= totalPages - 2) {
                start = totalPages - 4;
            }

            if (start > 2) {
                pages.push("...");
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) {
                pages.push("...");
            }
            
            pages.push(totalPages);
        }        
        return pages;
    };

    return (
        <>
            <ul className="space-y-4">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
                ) : jobs?.data?.length === 0 ? (
                    <Nojobs />
                ) : (
                    jobs?.data?.jobs?.map((job: IJob) => <JobCard job={job} key={job._id} />)
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
