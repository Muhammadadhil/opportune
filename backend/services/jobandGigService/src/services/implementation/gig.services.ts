import { IGig } from "../../types/IGig";
import { GigRepository } from "../../repositories/implementation/gig.repository";
import { IGigRepositoy } from "../../repositories/interfaces/IGigRepository";
import { IGigService } from "../interfaces/IGigService";
import { getSignedImageURL, uploadTosS3 } from "../../utils/uploadToS3";
import IUploadFile from "../../types/IUploadFile";
import { ObjectId } from "mongoose";
import { inject } from "inversify";
import { TYPES } from "../../types/types";

export class GigService implements IGigService {

    constructor(
        @inject(TYPES.IGigRepository) private _gigRepository: IGigRepositoy)
    {}

    async saveGig(files: IUploadFile[], data: IGig): Promise<IGig | null> {
        const images: string[] = await Promise.all(
            files.map(async (file) => {
                console.log("uploading image to s3 !!");
                return await uploadTosS3(file.buffer, file.mimetype);
            })
        );
        const newGig = await this._gigRepository.create({ ...data, images } as IGig);
        return newGig;
    }

    async editGig(data: IGig): Promise<IGig | null> {
        return await this._gigRepository.update(data._id as ObjectId, data);
    }


    async changeGigStatus(id: ObjectId): Promise<IGig | null> {
        return await this._gigRepository.updateActiveStatus(id);
    }

    async getGigs(id: string): Promise<IGig[] | null> {
        const gigDatas = await this._gigRepository.find({ freelancerId: id, isActive: true });
        for (const gig of gigDatas) {
            const imageUrls = await Promise.all(
                gig.images.map(async (image) => {
                    return await getSignedImageURL(image);
                })
            );
            gig.imageUrls = imageUrls;
        }
        return gigDatas;
    }

    async getAllGigs(): Promise<IGig[] | null> {
        const gigDatas = await this._gigRepository.find();
        for (const gig of gigDatas) {
            const imageUrls = await Promise.all(
                gig.images.map(async (image) => {
                    return await getSignedImageURL(image);
                })
            );
            gig.imageUrls = imageUrls;
        }
        return gigDatas;
    }
}
