
import {getApplications} from '@/api/jobsApi';
import {useQuery} from '@tanstack/react-query';


export default function useApplications(clientId: string,jobId:string){
    return useQuery({
        queryKey: ["applications"],
        queryFn: () => getApplications(clientId, jobId),
    });
}