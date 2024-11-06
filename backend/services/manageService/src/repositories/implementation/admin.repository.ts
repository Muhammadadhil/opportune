import Admin from "../../schema/admin.schema"


export class AdminRepository {

    async findAdmin(email:string){
        return await Admin.findOne({email});
    }

}