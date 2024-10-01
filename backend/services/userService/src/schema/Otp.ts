import mongoose, { Schema } from "mongoose";
import { IOtp } from "../interfaces/IOtp";

const OtpSchema: Schema<IOtp> = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, expires: "2m", default: Date.now, required: true },
});

export const Otp = mongoose.model("Otp", OtpSchema);


//pre-hook or pre-middlewares

OtpSchema.pre('save',function(next){
    this.set({createdAt:new Date()});
    next();
})

OtpSchema.pre("updateOne", function (next) {
    this.set({ createdAt: new Date() });
    next();
});

