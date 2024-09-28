
import IUser from "../interfaces/IUser";

export default interface UserWithoutPassword extends Omit<IUser, "password"> {}