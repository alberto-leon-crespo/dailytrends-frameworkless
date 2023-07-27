export interface ConfigServiceInterface {
    hasEnv(key: string): boolean;
    getEnv(key: string, defaultIfCantLocate?: any): any;
    setModuleConfigContext(moduleName: string, configDir: string): void;
    hasModuleConfig(moduleName: string, configPath: string): boolean;
    getModuleConfig(moduleName: string, configPath: string, defaultIfCantLocate: any): any;
}