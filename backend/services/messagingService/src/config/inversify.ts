import { Container } from "inversify";
import { TYPES } from "../interfaces/types";
import { ChatService } from "../services/implementation/chat.services";
import { ChatController } from "../controllers/implementation/chat.controller";
import { ChatRepository } from "../repositories/implementation/chat.repository";
import { MessageController } from "../controllers/implementation/message.controller";
import { MessageService } from "../services/implementation/message.services";

const container = new Container();

// container.bind<IUserService>(TYPES.IUserService).to(UserService);
// container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
// container.bind<IUserController>(TYPES.IUserController).to(UserController);

container.bind(TYPES.IChatController).to(ChatController);
container.bind(TYPES.IChatService).to(ChatService);
container.bind(TYPES.IChatRepository).to(ChatRepository);

container.bind(TYPES.IMessageController).to(MessageController);
container.bind(TYPES.IMessageService).to(MessageService);
container.bind(TYPES.IMessageRepository).to(ChatRepository);





export default container;
