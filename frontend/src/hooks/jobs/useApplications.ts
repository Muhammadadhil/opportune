
import {getApplications} from '@/api/job';
import { getFApplications } from "@/api/job";
import {useQuery} from '@tanstack/react-query';


export default function useApplications(userId: string,jobId:string,userType:string){
    return useQuery({
        queryKey: userType === "client" ? ["clientApplications"] : ["freelancerApplications"],
        queryFn: () => (userType === "client" ? getApplications(userId, jobId) : getFApplications(userId)),
        retry: 1
    });
}