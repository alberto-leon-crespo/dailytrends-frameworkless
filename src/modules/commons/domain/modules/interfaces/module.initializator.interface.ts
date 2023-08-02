import {Container} from "inversify";

export interface ModuleInitializatorInterface {
    initialize(container: Container): Promise<void>;
}