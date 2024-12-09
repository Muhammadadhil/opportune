import IClientDetail from "../../interfaces/IClientDetail";
import { BaseRepository } from "./Repository";
import { ClientDetail } from "../../schema/ClientDetails";
import { IClientRepository } from "../interfaces/IClientRepository";

export class ClientRepository extends BaseRepository<IClientDetail> implements IClientRepository {
    constructor() {
        super(ClientDetail);
    }

    // async findClientDetail(userId: ObjectId | string): Promise<IClientDetail | null> {
    //     return await ClientDetail.findOne({ userId });

        // console.log("client data:", data);

        // if (!data) {
        //     return null;
        // }

        // const client = {
        //     companyName: data.companyName,
        //     companyDescription: data.companyDescription,
        //     projectNeeds: data.projectNeeds,
        //     website: data.website,
        // };
        // return client;
    // }
}