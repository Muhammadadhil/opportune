import { IApplication } from "../../interfaces/IApplication";

export interface IApplicationService {
    initialize(): void;
    createApplication(data: IApplication): Promise<IApplication | null>;
}
