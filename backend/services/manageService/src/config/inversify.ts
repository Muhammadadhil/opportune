import { Container } from "inversify";
import { IUserService } from "../services/interfaces/IUserService";
import { UserService } from "../services/implementation/user.services";
import { IUserRepository } from "../repositories/interface/IUserRepository";
import { UserRepository } from "../repositories/implementation/user.repository";

import { UserConsumer } from "../events/rabbitmq/consumers/UserConsumer";
import IConsumer from "../interfaces/IConsumer";

const container = new Container();

// Bind UserService to IUserService
container.bind<IUserService>("IUserService").to(UserService);
container.bind<IUserRepository>("IUserRepository").to(UserRepository);

container.bind<IConsumer>("IUserConsumer").to(UserConsumer);


export default container;