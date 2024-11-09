import { IGig } from "../../interfaces/IGig";
import IUploadFile from "../../interfaces/IUploadFile";

export interface IGigService {
    saveGig(files: IUploadFile[], data: IGig): Promise<IGig | null>;
    editGig(userId: string, data: IGig): Promise<IGig | null>;
    changeGigStatus(id: string): Promise<IGig | null>;
    getGigs(id: string): Promise<IGig[] | null>;
    getAllGigs(): Promise<IGig[] | null>;
}
