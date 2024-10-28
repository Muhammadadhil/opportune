import { IGig } from "../../interfaces/IGig";
import { IBaseRepository } from "./IBaseRepository";

export interface IGigRepositoy extends IBaseRepository<IGig>{
    updateGigUsingFreelancerId(id: string, data: Partial<IGig>): Promise<IGig | null>;
    updateActiveStatus(id: string): Promise<IGig | null>;
}
