import IConsumer from "@_opportune/common/dist/interfaces/IConsumer";
import container from "../../config/inversify";
import { TYPES } from "../../interfaces/types";

export const InitialiseConsumers = () => {
    const userConsumer = container.get<IConsumer>(TYPES.IUserConsumer);
    
    userConsumer.initialise();
};