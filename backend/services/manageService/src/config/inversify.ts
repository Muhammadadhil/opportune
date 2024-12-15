import { Container } from "inversify";
import { IUserService } from "../services/interfaces/IUserService";
import { UserService } from "../services/implementation/user.services";
import { IUserRepository } from "../repositories/interface/IUserRepository";
import { UserRepository } from "../repositories/implementation/user.repository";
import { User } from "../schema/user.schema";
import { UserConsumer } from "../events/rabbitmq/consumers/UserConsumer";
import IConsumer from "../interfaces/IConsumer";
import { Model } from "mongoose";
import { IUser } from "../entities/UserEntity";
import { TYPES } from "../interfaces/types";
import { UserController } from "../controllers/implementation/user.controller";
import { IUserController } from "../controllers/interface/IUserController";

const container = new Container();

container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<IUserController>(TYPES.IUserController).to(UserController);

container.bind<IConsumer>("IUserConsumer").to(UserConsumer);

container.bind<Model<IUser>>("UserModel").toConstantValue(User);    


export default container;