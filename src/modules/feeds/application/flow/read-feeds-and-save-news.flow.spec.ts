import {bootstrap, tearDown} from "../../../../../test/bootstrap";
import {Container} from "inversify";
import {Types} from "mongoose";
import {SeedFeedsCommand} from "../commands/seed-feeds.command";
import {ReadFeedsQuery} from "../queries/read-feeds.query";
import {ReadFeedsAndSaveNewsFlow} from "./read-feeds-and-save-news.flow";

let container: Container;
let seedFeedsCommand: SeedFeedsCommand;
let readFeedsQuery: ReadFeedsQuery;
let readFeedsAndSaveNewsFlow: ReadFeedsAndSaveNewsFlow;
let news;

describe('Feed console command actions validate', () => {

    beforeAll( async () => {
        const app = await bootstrap(__filename);
        container = app.container;
        seedFeedsCommand = container.get<SeedFeedsCommand>(SeedFeedsCommand);
        readFeedsQuery = container.get<ReadFeedsQuery>(ReadFeedsQuery);
        readFeedsAndSaveNewsFlow = container.get<ReadFeedsAndSaveNewsFlow>(ReadFeedsAndSaveNewsFlow);
    });

    afterAll(async () => {
        await tearDown(__filename);
    });

    it('should seed feeds collection', async () => {
        await seedFeedsCommand.run();
    });

    it('should read feeds news', async () => {
        news = await readFeedsQuery.run();
    }, 30000);

    it('should validate feed read console flow', async () => {
        await readFeedsAndSaveNewsFlow.run()
    }, 30000);
});
