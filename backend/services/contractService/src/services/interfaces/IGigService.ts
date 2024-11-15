import { IGig } from "../../interfaces/IGig";

export interface IGigService {    
    getAllGigs(): Promise<IGig[] | null>;
}
