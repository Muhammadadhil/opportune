import { ObjectId } from "mongoose";

export interface UserDto {
    id: ObjectId; 
    name: string;
    email: string;
    role: string; 
}
