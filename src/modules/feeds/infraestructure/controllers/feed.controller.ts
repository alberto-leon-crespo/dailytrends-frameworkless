import * as express from "express";
import {
    controller,
    httpGet,
    httpPost,
    httpDelete,
    request,
    response,
    requestParam,
    requestBody,
    httpPut
} from "inversify-express-utils";
import { FeedDomain } from "../../domain/feed.domain";
import { GetAllFeedsQuery } from "../../application/queries/get-all-feeds.query";
import { GetFeedByIdQuery } from "../../application/queries/get-feed-by-id.query";
import { CreateFeedCommand } from "../../application/commands/create-feed.command";
import { transformAndValidate } from "class-transformer-validator";
import { CreateFeedDto } from "../dtos/create-feed.dto";
import { Optional } from "typescript-optional";
import { UpdateFeedCommand } from "../../application/commands/update-feed.command";
import { DeleteFeedCommand } from "../../application/commands/delete-feed.command";
import { container } from "../../../../bootstrap";
import { GetNewsByFeedIdQuery } from "../../../news/application/queries/get-news-by-feed-id.query";
import { HttpStatus } from "../../../commons/domain/server/http-statuses.enum";
import { BaseController } from "../../../commons/infraestructure/controllers/base.controller";
import { JsonResult } from "inversify-express-utils/lib/results";

@controller("/feeds")
export class FeedController extends BaseController {

    private readonly getAllFeedsQuery: GetAllFeedsQuery;
    private readonly getFeedByIdQuery: GetFeedByIdQuery;
    private readonly createFeedCommand: CreateFeedCommand;
    private readonly updateFeedCommand: UpdateFeedCommand;
    private readonly deleteFeedCommand: DeleteFeedCommand;
    private readonly getNewsByFeedIdQuery: GetNewsByFeedIdQuery;

    constructor() {
        super();
        this.getAllFeedsQuery = container.get<GetAllFeedsQuery>(GetAllFeedsQuery);
        this.getFeedByIdQuery = container.get<GetFeedByIdQuery>(GetFeedByIdQuery);
        this.createFeedCommand = container.get<CreateFeedCommand>(CreateFeedCommand);
        this.updateFeedCommand = container.get<UpdateFeedCommand>(UpdateFeedCommand);
        this.deleteFeedCommand = container.get<DeleteFeedCommand>(DeleteFeedCommand);
        this.getNewsByFeedIdQuery = container.get<GetNewsByFeedIdQuery>(GetNewsByFeedIdQuery);
    }
    @httpGet("/")
    private async list(@request() req: express.Request, @response() res: express.Response): Promise<JsonResult> {
        return this.json(await this.getAllFeedsQuery.run(), HttpStatus.OK);
    }

    @httpGet("/:id/news")
    private async listNewsByFeedId(@requestParam("id") id: string, @response() res: express.Response):
        Promise<JsonResult>
    {
        const news = await this.getNewsByFeedIdQuery.run(id);
        if (news.length < 1) {
            return this.json(news, HttpStatus.NOT_FOUND);
        }
        return this.json(news, HttpStatus.OK);
    }

    @httpGet("/:id")
    private async detail(@requestParam("id") id: string, @response() res: express.Response):
        Promise<JsonResult>
    {
        const feed = await this.getFeedByIdQuery.run(id);
        if (feed.isEmpty()) {
            return this.json({}, HttpStatus.NOT_FOUND);
        }
        return this.json(feed, HttpStatus.OK);
    }

    @httpPost("/")
    private async create(@requestBody() feed: CreateFeedDto, @response() res: express.Response):
        Promise<JsonResult>
    {
        try {
            await transformAndValidate(CreateFeedDto, feed);
            const createdFeed = await this.createFeedCommand.run(feed);
            return this.json(createdFeed, HttpStatus.CREATED);
        } catch (errors) {
            return this.json(errors, HttpStatus.BAD_REQUEST);
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
            this.json(updatedFeed, HttpStatus.NO_CONTENT);
        } catch (errors) {
            this.json(errors, HttpStatus.NO_CONTENT);
            return;
        }
    }

    @httpDelete("/:id")
    private async delete(@requestParam("id") id: string, @response() res: express.Response): Promise<JsonResult> {
        return this.json(await this.deleteFeedCommand.run(id), HttpStatus.NO_CONTENT);
    }
}