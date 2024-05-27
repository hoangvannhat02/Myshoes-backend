import { Router } from "express";
import { container, injectable } from "tsyringe";
import { EvaluateController } from "../../controllers/user/evaluate.controller";
const evaluateRouter = Router();

const evaluateController = container.resolve(EvaluateController);
evaluateRouter.get('/getdata',evaluateController.get.bind(evaluateController));
evaluateRouter.post('/create',evaluateController.create.bind(evaluateController));
evaluateRouter.post('/update',evaluateController.update.bind(evaluateController));
evaluateRouter.post('/uploadfile',evaluateController.uploadFile.bind(evaluateController));
evaluateRouter.delete('/delete',evaluateController.delete.bind(evaluateController));

export default evaluateRouter;