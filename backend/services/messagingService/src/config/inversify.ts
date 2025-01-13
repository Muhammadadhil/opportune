import { Container } from "inversify";
import { TYPES } from "../interfaces/types";
import { ChatService } from "../services/implementation/chat.services";
import { ChatController } from "../controllers/implementation/chat.controller";
import { ChatRepository } from "../repositories/implementation/chat.repository";
import { MessageController } from "../controllers/implementation/message.controller";
import { MessageService } from "../services/implementation/message.services";
import { MessageRepository } from "../repositories/implementation/messageRepository";
import { IUserService } from "../services/interfaces/IUserService";
import { UserService } from "../services/implementation/user.services";
import { UserRepository } from "../repositories/implementation/user.repository";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import IConsumer from "@_opportune/common/dist/interfaces/IConsumer";
import { UserConsumer } from "../events/rabbitmq/consumers/UserConsumer";
import { IMessageController } from "../controllers/interface/IMessageController";
import { IMessageService } from "../services/interfaces/IMessageService";
import { IMessageRepository } from "../repositories/interfaces/IMessageRepository";
import { IChatController } from "../controllers/interface/IChatController";
import { IChatService } from "../services/interfaces/IChatService";
import { IChatRepository } from "../repositories/interfaces/IChatRepository";

const container = new Container();

container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

container.bind<IConsumer>(TYPES.IUserConsumer).to(UserConsumer);

container.bind<IChatController>(TYPES.IChatController).to(ChatController);
container.bind<IChatService>(TYPES.IChatService).to(ChatService);
container.bind<IChatRepository>(TYPES.IChatRepository).to(ChatRepository);

container.bind<IMessageController>(TYPES.IMessageController).to(MessageController);
container.bind<IMessageService>(TYPES.IMessageService).to(MessageService);
container.bind<IMessageRepository>(TYPES.IMessageRepository).to(MessageRepository);






export default container;
