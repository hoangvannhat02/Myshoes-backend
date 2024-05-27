import { Router } from "express";
import { container, injectable } from "tsyringe";
import { TransportController } from "../../controllers/admin/transport.controller";
import { authenticate } from "../../middleware/authenticateMiddleware";
const transportRouter = Router();
transportRouter.use(authenticate)
const transportController = container.resolve(TransportController);
transportRouter.get('/data',transportController.get.bind(transportController));
transportRouter.get('/databyid/:id',transportController.getdatabyid.bind(transportController));
transportRouter.post('/create',transportController.create.bind(transportController));
transportRouter.delete('/delete/:id',transportController.delete.bind(transportController));
transportRouter.post('/update',transportController.update.bind(transportController));
transportRouter.post('/search',transportController.search.bind(transportController));

export default transportRouter;