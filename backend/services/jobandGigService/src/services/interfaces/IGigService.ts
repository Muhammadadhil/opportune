import { ObjectId } from "mongoose";
import { IGig } from "../../interfaces/IGig";
import IUploadFile from "../../interfaces/IUploadFile";

export interface IGigService {
    saveGig(files: IUploadFile[], data: IGig): Promise<IGig | null>;
    editGig(data: IGig): Promise<IGig | null>;
    changeGigStatus(id: ObjectId): Promise<IGig | null>;
    getGigs(id: string): Promise<IGig[] | null>;
    getAllGigs(): Promise<IGig[] | null>;
}
