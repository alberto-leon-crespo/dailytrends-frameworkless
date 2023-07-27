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
    BaseHttpController
} from "inversify-express-utils";
import { inject } from "inversify";
import {LoggerService} from "../../../commons/domain/services/logger.service";
import {LoggerServiceInterface} from "../../../commons/domain/services/interfaces/logger.service.interface";
import {ConfigService} from "../../../commons/domain/services/config.service";
import {CommonsModule} from "../../../commons/commons.module";

@controller("/feeds")
export class FeedController extends BaseHttpController implements interfaces.Controller {

    constructor(@inject(LoggerService) private readonly loggerService: LoggerServiceInterface, @inject(ConfigService) private readonly configService: ConfigService) {
        super();
    }

    @httpGet("/test")
    private test(@response() res: express.Response) {
        this.loggerService.info('Logger log test');
        console.log(this.configService.getModuleConfig(CommonsModule.name, 'app.port'));
        return this.json({status: 'ok'}, 200);
    }

    @httpGet("/")
    private list(@request() req: express.Request, @response() res: express.Response) {
        this.json({status: 'ok'});
    }

    @httpGet("/:id")
    private detail(@requestParam("id") id: string, @response() res: express.Response) {
        res.sendStatus(200).send({status: 'ok'}).end();
    }

    @httpPost("/")
    private async create(@request() req: express.Request, @response() res: express.Response) {
        res.sendStatus(200).send(req.body).end();
    }

    @httpDelete("/:id")
    private delete(@requestParam("id") id: string, @response() res: express.Response) {
        res.sendStatus(200).send({
            status: 200,
            message: `Feed ${id} deleted correctly`
        }).end();
    }
}