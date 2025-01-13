import { useQueryClient, useMutation } from "@tanstack/react-query";
import { removeJob } from "@/api/job";
import { IJob } from "@/types/IJob";

export const useRemoveJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (jobId: string) => removeJob(jobId),

        onMutate: async (jobId: string) => {
            await queryClient.cancelQueries({ queryKey: ["jobs"] });
            const previousJobs = queryClient.getQueryData<IJob[]>(["jobs"]);

            if (previousJobs) {
                queryClient.setQueryData<IJob[]>(["jobs"], (old) => old?.filter((job) => job._id !== jobId));
            }

            return { previousJobs };
        },
        onError: (err, jobId, context) => {
            // Rollback to the previous jobs list on error
            queryClient.setQueryData(["jobs"], context?.previousJobs);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
        },
    });
};
