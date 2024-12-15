import { ObjectId } from "mongoose";
import { IGig } from "../../types/IGig";
import IUploadFile from "../../types/IUploadFile";

export interface IGigService {
    saveGig(files: IUploadFile[], data: IGig): Promise<IGig | null>;
    editGig(data: IGig): Promise<IGig | null>;
    changeGigStatus(id: ObjectId): Promise<IGig | null>;
    getGigs(id: string): Promise<IGig[] | null>;
    getAllGigs(): Promise<IGig[] | null>;
}
