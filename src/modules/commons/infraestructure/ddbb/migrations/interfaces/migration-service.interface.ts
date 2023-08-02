export interface MigrationServiceInterface {
    runMigrations(): Promise<void>;
}
