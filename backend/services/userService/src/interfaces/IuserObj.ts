
import IUser from "../interfaces/IUser";
import IClientDetail from "./IClientDetail";
import IFreelancer from "./IFreelancer";

export default interface UserWithoutPassword extends Omit<IUser, "password"> {}

export interface IUserWithFreelancerDetails extends Omit<IUser, "password"> {
    freelancerDetails?: IFreelancer;
}

export interface IUserWithClientDetails extends Omit<IUser, "password"> {
    clientDetails?: IClientDetail;
}