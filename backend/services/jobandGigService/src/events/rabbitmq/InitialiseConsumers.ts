import IConsumer from "@_opportune/common/dist/interfaces/IConsumer";
import container from "../../config/inversify";

export const InitialiseConsumers = () => {
    const userConsumer = container.get<IConsumer>("IUserConsumer");
    
    userConsumer.initialise();
};