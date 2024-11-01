import { IGig } from "../../interfaces/IGig";

export interface IGigService {
    saveGig( data: IGig): Promise<IGig | null>;
    editGig(userId: string, data: IGig): Promise<IGig | null>;
    changeGigStatus(id: string): Promise<IGig | null>;
}
