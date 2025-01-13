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
import { TYPES } from "../types/types";
import { JobService } from "../services/implementation/job.services";
import { IJobService } from "../services/interfaces/IJobService";
import { JobRepository } from "../repositories/implementation/job.repositoty";
import { IJobRepository } from "../repositories/interfaces/IJobRepository";
import { JobController } from "../controllers/implementation/job.controller";
import { IJobController } from "../controllers/interface/IJobController";
import { GigController } from "../controllers/implementation/gig.controller";
import { GigService } from "../services/implementation/gig.services";
import { GigRepository } from "../repositories/implementation/gig.repository";
import { RabbitMQProducer } from "../events/rabbitmq/producer/Producer";
import { IGigController } from "../controllers/interface/IGigController";
import { IGigService } from "../services/interfaces/IGigService";
import { PorfolioController } from "../controllers/implementation/portfolio.controller";
import { PortfolioService } from "../services/implementation/portfolio.services";
import { IPortfolioRepository } from "../repositories/interfaces/IPortFolioRepository";
import { IPortfolioService } from "../services/interfaces/IPortfolioServices";
import { IPortfolioController } from "../controllers/interface/IPortfolioController";
import { PortfolioRepository } from "../repositories/implementation/PortfolioRepository";

const container = new Container();

container.bind(TYPES.RabbitMQProducer).to(RabbitMQProducer).inSingletonScope();

container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<Model<IUser>>("UserModel").toConstantValue(User);
container.bind<IConsumer>(TYPES.IUserConsumer).to(UserConsumer);

container.bind<IJobService>(TYPES.IJobService).to(JobService);
container.bind<IJobRepository>(TYPES.IJobRepository).to(JobRepository);
container.bind<IJobController>(TYPES.IJobController).to(JobController);

container.bind<IGigController>(TYPES.IGigController).to(GigController);
container.bind<IGigService>(TYPES.IGigService).to(GigService);
container.bind(TYPES.IGigRepository).to(GigRepository);

container.bind<IPortfolioController>(TYPES.IPortFolioController).to(PorfolioController);
container.bind<IPortfolioService>(TYPES.IPortfolioService).to(PortfolioService);
container.bind<IPortfolioRepository>(TYPES.IPortfolioRepository).to(PortfolioRepository);


export default container;
