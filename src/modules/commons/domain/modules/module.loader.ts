import {ModuleInitializatorInterface} from "./interfaces/module.initializator.interface";
import {Container} from "inversify";

export class ModuleLoader {
    public constructor(private modules: ModuleInitializatorInterface[], private container: Container) {}

    public async initialize() {
        for(const module of this.modules) {
            await module.initialize(this.container);
        }
    }
}