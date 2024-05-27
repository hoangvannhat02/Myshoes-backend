import { Router } from "express";
import { container, injectable } from "tsyringe";
import { DetailProductController } from "../../controllers/admin/detailproduct.controller";
const detailproductRouter = Router();

const detailController = container.resolve(DetailProductController);
detailproductRouter.get('/data',detailController.get.bind(detailController));
detailproductRouter.get('/databyid/:id',detailController.getdatabyid.bind(detailController));
detailproductRouter.get('/databyproductid/:id',detailController.getdatabyproductid.bind(detailController));
detailproductRouter.post('/create',detailController.create.bind(detailController));
detailproductRouter.delete('/delete/:id',detailController.delete.bind(detailController));
detailproductRouter.post('/update',detailController.update.bind(detailController));
detailproductRouter.post('/updatequantityproduct',detailController.updateQuantityProduct.bind(detailController));

export default detailproductRouter;