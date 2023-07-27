import { injectable } from 'inversify';
import mongoose from 'mongoose';

@injectable()
export class DailytrendsDatasourceService {
    public readonly connection: mongoose.Connection;

    constructor() {
        this.connection = mongoose.createConnection(
            'mongodb://localhost:27017/myDb',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            } as any
        );
    }
}