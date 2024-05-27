import { Router } from "express";
import { container, injectable } from "tsyringe";
import { CategoryVoucherController } from "../../controllers/admin/categoryvoucher.controller";
import { authenticate } from "../../middleware/authenticateMiddleware";
const categoryvoucherRouter = Router();
categoryvoucherRouter.use(authenticate)

const categoryvoucherController = container.resolve(CategoryVoucherController);
categoryvoucherRouter.get('/data',categoryvoucherController.get.bind(categoryvoucherController));
categoryvoucherRouter.get('/databyid/:id',categoryvoucherController.getdatabyid.bind(categoryvoucherController));
categoryvoucherRouter.post('/create',categoryvoucherController.create.bind(categoryvoucherController));
categoryvoucherRouter.delete('/delete/:id',categoryvoucherController.delete.bind(categoryvoucherController));
categoryvoucherRouter.post('/update',categoryvoucherController.update.bind(categoryvoucherController));
categoryvoucherRouter.post('/search',categoryvoucherController.search.bind(categoryvoucherController));

export default categoryvoucherRouter;