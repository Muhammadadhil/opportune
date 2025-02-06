import { ObjectId, Document } from "mongoose";


export interface ISkill extends Document{
    id: string; 
    skill_name: string; 
}