import { IGig } from "../../interfaces/IGig";
import { GigRepository } from "../../repositories/implementation/gig.repository";
import { IGigRepositoy } from "../../repositories/interfaces/IGigRepository";
import { IGigService } from "../interfaces/IGigService";
import { getSignedImageURL, uploadTosS3 } from "../../utils/uploadToS3";
import IUploadFile from "../../interfaces/IUploadFile";

export class GigService implements IGigService {
    private gigRepository: IGigRepositoy;

    constructor() {
        this.gigRepository = new GigRepository();
    }

    async saveGig(files: IUploadFile[], data: IGig): Promise<IGig | null> {
        const images: string[] = await Promise.all(
            files.map(async (file) => {
                console.log("uploading image to s3 !!");
                return await uploadTosS3(file.buffer, file.mimetype);
            })
        );
        const newGig = await this.gigRepository.create({ ...data, images } as IGig);
        return newGig;
    }

    async editGig(userId: string, data: IGig): Promise<IGig | null> {
        return await this.gigRepository.updateGigUsingFreelancerId(userId, data);
    }

    async changeGigStatus(id: string): Promise<IGig | null> {
        return await this.gigRepository.updateActiveStatus(id);
    }

    async getGigs(id: string): Promise<IGig[] | null> {
        const gigDatas = await this.gigRepository.find({ freelancerId: id });
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
        return await this.gigRepository.find();
    }
}
