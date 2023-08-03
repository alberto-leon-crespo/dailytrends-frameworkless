import * as express from "express";
import {
    interfaces,
    controller,
    httpGet,
    httpPost,
    httpDelete,
    request,
    response,
    requestParam,
    BaseHttpController, requestBody, httpPut
} from "inversify-express-utils";
import { FeedDomain } from "../../domain/feed.domain";
import { GetAllFeedsQuery } from "../../application/queries/get-all-feeds.query";
import { GetFeedByIdQuery } from "../../application/queries/get-feed-by-id.query";
import { CreateFeedCommand } from "../../application/commands/create-feed.command";
import { transformAndValidate } from "class-transformer-validator";
import { CreateFeedDto } from "../dtos/create-feed.dto";
import { LoggerService } from "../../../commons/domain/services/logger.service";
import { Optional } from "typescript-optional";
import { UpdateFeedCommand } from "../../application/commands/update-feed.command";
import { DeleteFeedCommand } from "../../application/commands/delete-feed.command";
import { container } from "../../../../bootstrap";
import { GetNewsByFeedIdQuery } from "../../../news/application/queries/get-news-by-feed-id.query";
import { NewDomain } from "../../../news/domain/new.domain";
import { HttpStatus } from "../../../commons/domain/server/http-statuses.enum";

@controller("/feeds")
export class FeedController extends BaseHttpController implements interfaces.Controller {

    private readonly getAllFeedsQuery: GetAllFeedsQuery;
    private readonly getFeedByIdQuery: GetFeedByIdQuery;
    private readonly createFeedCommand: CreateFeedCommand;
    private readonly updateFeedCommand: UpdateFeedCommand;
    private readonly deleteFeedCommand: DeleteFeedCommand;
    private readonly getNewsByFeedIdQuery: GetNewsByFeedIdQuery;
    private readonly loggerService: LoggerService;

    constructor() {
        super();
        this.getAllFeedsQuery = container.get<GetAllFeedsQuery>(GetAllFeedsQuery);
        this.getFeedByIdQuery = container.get<GetFeedByIdQuery>(GetFeedByIdQuery);
        this.createFeedCommand = container.get<CreateFeedCommand>(CreateFeedCommand);
        this.updateFeedCommand = container.get<UpdateFeedCommand>(UpdateFeedCommand);
        this.deleteFeedCommand = container.get<DeleteFeedCommand>(DeleteFeedCommand);
        this.getNewsByFeedIdQuery = container.get<GetNewsByFeedIdQuery>(GetNewsByFeedIdQuery);
        this.loggerService = container.get<LoggerService>(LoggerService);
    }
    @httpGet("/")
    private async list(@request() req: express.Request, @response() res: express.Response): Promise<FeedDomain[]> {
        return await this.getAllFeedsQuery.run();
    }

    @httpGet("/:id/news")
    private async listNewsByFeedId(@requestParam("id") id: string, @response() res: express.Response):
        Promise<Optional<NewDomain>[]>
    {
        return await this.getNewsByFeedIdQuery.run(id);
    }

    @httpGet("/:id")
    private async detail(@requestParam("id") id: string, @response() res: express.Response):
        Promise<Optional<FeedDomain>>
    {
        return await this.getFeedByIdQuery.run(id);
    }

    @httpPost("/")
    private async create(@requestBody() feed: CreateFeedDto, @response() res: express.Response):
        Promise<Optional<FeedDomain> | Promise<any>>
    {
        try {
            await transformAndValidate(CreateFeedDto, feed);
            const createdFeed = await this.createFeedCommand.run(feed);
            res.status(HttpStatus.CREATED).send(createdFeed);
            return
        } catch (errors) {
            res.status(HttpStatus.BAD_REQUEST).send(errors);
            return;
        }
    }

    @httpPut("/:id")
    private async update(
        @requestParam("id") id: string,
        @requestBody() feed: CreateFeedDto,
        @response() res: express.Response
    ):
        Promise<Optional<FeedDomain> | Promise<any>>
    {
        try {
            await transformAndValidate(CreateFeedDto, feed);
            const updatedFeed = await this.updateFeedCommand.run(id, feed);
            res.status(HttpStatus.NO_CONTENT).send(updatedFeed);
            return
        } catch (errors) {
            res.status(HttpStatus.BAD_REQUEST).send(errors);
            return;
        }
    }

    @httpDelete("/:id")
    private async delete(@requestParam("id") id: string, @response() res: express.Response) {
        await this.deleteFeedCommand.run(id);
        res.sendStatus(HttpStatus.NO_CONTENT);
    }
}