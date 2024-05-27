import { Router } from "express";
import { container, injectable } from "tsyringe";
import { ProductController } from "../../controllers/user/product.controller";
const productRouter = Router();

const productController = container.resolve(ProductController);
productRouter.get('/data',productController.get.bind(productController));
productRouter.get('/datacolor/:id',productController.getcolorbyproid.bind(productController));
productRouter.get('/dataproductbyid/:id',productController.getdataproductbyid.bind(productController));
productRouter.post('/datasize',productController.getsizebyid.bind(productController));
productRouter.post('/dataquantyofsize',productController.getquantyofsizebyid.bind(productController));
productRouter.post('/databyid',productController.getdatabyid.bind(productController));
productRouter.post('/getimgbycolorid',productController.getimgbydetailproendcolorid.bind(productController));
productRouter.get('/databycateid/:id',productController.getdatabycateid.bind(productController));

export default productRouter;