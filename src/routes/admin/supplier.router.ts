import { Router } from "express";
import { container, injectable } from "tsyringe";
import { SupplierController } from "../../controllers/admin/supplier.controller";
import { authenticate } from "../../middleware/authenticateMiddleware";
const supplierRouter = Router();
supplierRouter.use(authenticate)

const supplierController = container.resolve(SupplierController);
supplierRouter.get('/data',supplierController.get.bind(supplierController));
supplierRouter.get('/databyid/:id',supplierController.getdatabyid.bind(supplierController));
supplierRouter.post('/create',supplierController.create.bind(supplierController));
supplierRouter.delete('/delete/:id',supplierController.delete.bind(supplierController));
supplierRouter.post('/update',supplierController.update.bind(supplierController));
supplierRouter.post('/search',supplierController.search.bind(supplierController));

export default supplierRouter;