import { Router } from "express";
import { container, injectable } from "tsyringe";
import { SizeController } from "../../controllers/admin/size.controller";
const sizeRouter = Router();

const sizeController = container.resolve(SizeController);
sizeRouter.get('/data',sizeController.get.bind(sizeController));
sizeRouter.get('/databyid/:id',sizeController.getdatabyid.bind(sizeController));
sizeRouter.post('/create',sizeController.create.bind(sizeController));
sizeRouter.delete('/delete/:id',sizeController.delete.bind(sizeController));
sizeRouter.post('/update',sizeController.update.bind(sizeController));
sizeRouter.post('/search',sizeController.search.bind(sizeController));

export default sizeRouter;