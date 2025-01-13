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

import { AdminTransactionRepository } from "../repositories/implementation/adminTransactionRepository";
import { AdminTransactionService } from "../services/implementation/admin.transaction.service";
import { AdminTransactionController } from "../controllers/implementation/admin.transaction.controller";
import { IAdminTransactionController } from "../controllers/interface/IAdminTransactionController";
import { IAdminTransactionService } from "../services/interfaces/IAdmin.transactionService";
import { IAdminTransactionRepository } from "../repositories/interface/IAdminTransaction";

const container = new Container();

container.bind<IAdminTransactionRepository>(TYPES.IAdminTransactionRepository).to(AdminTransactionRepository);
container.bind<IAdminTransactionService>(TYPES.IAdminTransactionService).to(AdminTransactionService);
container.bind<IAdminTransactionController>(TYPES.IAdminTransactionController).to(AdminTransactionController);

container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<IUserController>(TYPES.IUserController).to(UserController);

container.bind<IConsumer>("IUserConsumer").to(UserConsumer);

container.bind<Model<IUser>>("UserModel").toConstantValue(User);    




export default container;