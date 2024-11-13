import { useQueryClient, useMutation, UseMutationResult } from "@tanstack/react-query";
import { editJob } from "@/api/jobsApi";
import { IJob } from "@/types/IJob";

export const useEditJob = (): UseMutationResult<IJob, unknown, IJob, { previousJobs: IJob[] | undefined }> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (job: IJob) => editJob(job),

        onMutate: async (updatedJob: IJob) => {
            await queryClient.cancelQueries({ queryKey: ["jobs"] });
            const previousJobs = queryClient.getQueryData<IJob[]>(["jobs"]);

            // Optimistically update to the new value
            if (previousJobs) {
                queryClient.setQueryData<IJob[]>(["jobs"], (old) => old?.map((job) => (job._id === updatedJob._id ? { ...job, ...updatedJob } : job)));
            }
            // Return a context object with the snapshotted value
            return { previousJobs };
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, updatedJob, context) => {
            queryClient.setQueryData(["jobs"], context?.previousJobs);
        },
        // Always refetch after error or success
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
        },
    });
};
