import {useQuery} from "@tanstack/react-query";
import { getHires } from "@/api/job";

export default function useHires(jobId:string) {
    return useQuery({
        queryKey: ["hires"],
        queryFn: () => getHires(jobId),
    })
}