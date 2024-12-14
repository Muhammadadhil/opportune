
import container from "../../config/inversify";
import IConsumer from "../../interfaces/IConsumer";

export async function intialiseConsumers() {

    const userConsumer = container.get<IConsumer>("IUserConsumer");

    userConsumer.initialise();
}