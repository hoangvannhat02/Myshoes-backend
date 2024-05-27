import { Router } from "express";
import { container, injectable } from "tsyringe";
import { DetailBillofsaleController } from "../../controllers/user/detailbillofsale.controller";
const detailbillofsaleRouter = Router();

const detailbillofsaleController = container.resolve(DetailBillofsaleController);
detailbillofsaleRouter.get('/datainfocustomerbyid/:id',detailbillofsaleController.getdatainfoproductsbyid.bind(detailbillofsaleController));
detailbillofsaleRouter.post('/create',detailbillofsaleController.create.bind(detailbillofsaleController));
export default detailbillofsaleRouter;