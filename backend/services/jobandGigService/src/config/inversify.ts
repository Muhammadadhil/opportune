import { Container } from "inversify";
import { IUserService } from "../services/interfaces/IUserService";
import { UserService } from "../services/implementation/user.services";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { UserRepository } from "../repositories/implementation/user.repository";
import { User } from "../schema/user.schema";
import { UserConsumer } from "../events/rabbitmq/consumers/UserConsumer";
import IConsumer from "@_opportune/common/dist/interfaces/IConsumer";
import { Model } from "mongoose";
import { IUser } from "../entities/UserEntity";

const container = new Container();

// Bind UserService to IUserService
container.bind<IUserService>("IUserService").to(UserService);
container.bind<IUserRepository>("IUserRepository").to(UserRepository);

container.bind<IConsumer>("IUserConsumer").to(UserConsumer);

container.bind<Model<IUser>>("UserModel").toConstantValue(User);

export default container;
