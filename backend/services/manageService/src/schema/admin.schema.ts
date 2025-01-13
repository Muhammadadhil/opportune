import mongoose, { Schema, } from "mongoose";
import { IAdmin } from "../interfaces/IAdmin";

const adminSchema = new Schema<IAdmin>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    
});

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
export default Admin;
