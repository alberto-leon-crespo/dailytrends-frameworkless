import {BaseHttpController, interfaces} from 'inversify-express-utils';
import { JsonResult } from "inversify-express-utils/lib/results";

export class BaseController extends BaseHttpController implements interfaces.Controller {
    protected json(result: any, statusCode?: number): JsonResult {
        // En este caso, verificamos si el resultado tiene un método `toJSON()`.
        // Si es así, lo llamamos antes de pasar el resultado a `res.json()`.
        if (result && typeof result.toJSON === 'function') {
            result = result.toJSON();
        }

        return super.json(result, statusCode);
    }
}