import { ObjectId } from "mongoose";
import IAccounts from "./IAccounts";

export default interface IFreelancer  {
    userId: ObjectId | string;
    title:string;
    skills:string[];
    accounts:IAccounts;
    image:string;
    imageUrl?:string;
    
}
