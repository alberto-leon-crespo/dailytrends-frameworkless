import {Container, interfaces} from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import ContainerOptions = interfaces.ContainerOptions;

export class ContainerBuilder {
    public static build(containerConfig: ContainerOptions): Container {
        const container = new Container(containerConfig);
        container.load(buildProviderModule());
        return container;
    }
}

