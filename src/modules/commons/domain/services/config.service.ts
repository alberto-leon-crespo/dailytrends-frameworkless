import { injectable } from 'inversify';
import config from 'config';
import * as dotenvExpand from 'dotenv-expand';
import dotenv from "dotenv";
import * as _ from 'lodash';
import { CommonsModule } from "../../commons.module";

@injectable()
export class ConfigService {

    private moduleConfigs: { [key: string]: any } = {};
    public constructor(boundedContext: string = CommonsModule.name) {
        const envVars = dotenv.config();
        dotenvExpand.expand(envVars);
        config.util.loadFileConfigs(process.env.NODE_CONFIG_DIR);
        this.moduleConfigs[boundedContext] = this.replaceEnvVars(config.util.toObject());
    }

    public setModuleConfigContext(moduleName: string, configDir: string) {
        const envVars = dotenv.config();
        dotenvExpand.expand(envVars);
        config.util.loadFileConfigs(configDir);
        this.moduleConfigs[moduleName] = this.replaceEnvVars(config.util.toObject());
    }

    public hasModuleConfig(moduleName: string, configPath: string): boolean {
        if (this.moduleConfigs[moduleName]) {
            return _.get(this.moduleConfigs[moduleName], configPath) !== undefined;
        }
        return false;
    }

    public getModuleConfig(moduleName: string, configPath: string, defaultIfCantLocate: any = undefined): any {
        if (this.moduleConfigs[moduleName]) {
            return _.get(this.moduleConfigs[moduleName], configPath, defaultIfCantLocate);
        }
        return defaultIfCantLocate;
    }

    public hasEnv(key: string) {
        if (process.env && process.env[key]) {
            return true;
        }
        return false;
    }

    public getEnv(key: string, defaultIfCantLocate: any = undefined) {
        if(this.hasEnv(key)) {
            return process.env[key];
        }
        return defaultIfCantLocate;
    }

    private replaceEnvVars(data: any): any {
        let copy = { ...data };  // Create a shallow copy of the object
        for (let key in copy) {
            if (typeof copy[key] === 'string') {
                copy[key] = copy[key].replace(/\$\{(.*)\}/, (match: any, envVar: any) => process.env[envVar] || '');
            } else if (typeof copy[key] === 'object') {
                copy[key] = this.replaceEnvVars(copy[key]);
            }
        }
        return copy;
    }
}