import mongoose from "mongoose";
export let dbInstance:typeof mongoose;

export default async () => {
    try {
        if(process.env.MONGODB_URL){
            dbInstance = await mongoose.connect(process.env.MONGODB_URL);
            console.log('user-service DB connected!');
        }else{
            throw new Error("MONGODB_URL not defined")
        }
    } catch (error) {
        console.log("DB connection failed " + error);
    }
};


