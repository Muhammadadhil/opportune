
import { useQuery } from "@tanstack/react-query";
import {getFContracts} from "@/api/contracts";
import { getClientContracts } from "@/api/contracts";

export default function useContracts(userId: string,userType:string) {
    return useQuery({
        queryKey: userType === "client" ? ["contracts"] : ["fContracts"],
        queryFn: () => (userType === "client" ? getClientContracts(userId) : getFContracts(userId)),
    });
}
