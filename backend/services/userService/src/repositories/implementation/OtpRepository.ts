// This layer interacts with the database directly. It will contain methods for data manipulation like create, find, etc.

import OtpModel from "../../schema/Otp";
import { IOtp } from "../../interfaces/IOtp";
import { BaseRepository } from "./base.repository";
import { IOtpRepository } from "../interfaces/IOtpRepository";

export class OtpRepository extends BaseRepository<IOtp> implements IOtpRepository {

    constructor(){
        super(OtpModel);
    }
    
    // async storeOtp(otpData: IOtp) {
    //     const otp = new Otp(otpData);
    //     return await otp.save();
    // }

    // async findOtp(email:string){
    //     return await Otp.findOne({email});
    // }

    // async removeOtp(email:string){
    //      await Otp.deleteOne({email});
    // }
}
