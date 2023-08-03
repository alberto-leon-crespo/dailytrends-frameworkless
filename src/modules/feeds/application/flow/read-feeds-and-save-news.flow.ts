import { UsecaseInterface } from "../../../commons/domain/usecases/UsecaseInterface";
import { injectable } from "inversify";
import {container} from "../../../../bootstrap";
import {ReadFeedsQuery} from "../queries/read-feeds.query";
import {CreateNewCommand} from "../../../news/application/commands/create-new.command";

@injectable()
export class ReadFeedsAndSaveNewsFlow implements UsecaseInterface {

    private readFeedsQuery: ReadFeedsQuery;
    private createNewCommand: CreateNewCommand;
    public constructor() {
        this.readFeedsQuery = container.get<ReadFeedsQuery>(ReadFeedsQuery);
        this.createNewCommand = container.get<CreateNewCommand>(CreateNewCommand);
    }

    public async run(): Promise<void> {
        const news = await this.readFeedsQuery.run();
        for (const newData of news) {
            if (newData.author && newData.title && newData.link && newData.feed_id) {
                await this.createNewCommand.run(newData);
            }
        }
    }
}