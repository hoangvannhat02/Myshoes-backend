import { Router } from "express";
import { container, injectable } from "tsyringe";
import { ColorController } from "../../controllers/admin/color.controller";
import { authenticate } from "../../middleware/authenticateMiddleware";
const colorRouter = Router();
colorRouter.use(authenticate)

const colorController = container.resolve(ColorController);
colorRouter.get('/data',colorController.get.bind(colorController));
colorRouter.get('/databyid/:id',colorController.getdatabyid.bind(colorController));
colorRouter.post('/create',colorController.create.bind(colorController));
colorRouter.delete('/delete/:id',colorController.delete.bind(colorController));
colorRouter.post('/update',colorController.update.bind(colorController));
colorRouter.post('/search',colorController.search.bind(colorController));

export default colorRouter;