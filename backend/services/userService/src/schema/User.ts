import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/IUser";

const UserSchema: Schema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    country: {
        type: String,
        required: function (this:any){
            return !this.isOAuthUser;
        },
    },
    password: {
        type: String,
        required: function(this:any){
            return !this.isOAuthUser;
        },
    },
    role: {
        type: String,
        required: true,
        // enum:['client','freelancer','admin']
    },
    isOAuthUser:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
});

export const User = mongoose.model<IUser>("User", UserSchema);
