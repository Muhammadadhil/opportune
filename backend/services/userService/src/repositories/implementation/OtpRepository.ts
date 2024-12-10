// This layer interacts with the database directly. It will contain methods for data manipulation like create, find, etc.

import OtpModel from "../../schema/Otp";
import { IOtp } from "../../interfaces/IOtp";
import { BaseRepository } from "./Repository";
import { IOtpRepository } from "../interfaces/IOtpRepository";

export class OtpRepository extends BaseRepository<IOtp> implements IOtpRepository {

    constructor(){
        super(OtpModel);
    }
    
}
