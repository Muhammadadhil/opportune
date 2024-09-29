import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/IUser";

const UserSchema: Schema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
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
    },
    isOAuthUser:{
        type:Boolean,
        default:false
    }
});

export const User = mongoose.model<IUser>("User", UserSchema);
