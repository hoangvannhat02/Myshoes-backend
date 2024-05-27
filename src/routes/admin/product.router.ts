import { Router } from "express";
import { container, injectable } from "tsyringe";
import { ProductController } from "../../controllers/admin/product.controller";
import { authenticate } from "../../middleware/authenticateMiddleware";
const productRouter = Router();
productRouter.use(authenticate)

const productController = container.resolve(ProductController);
productRouter.get('/data',productController.get.bind(productController));
productRouter.get('/databyid/:id',productController.getdatabyid.bind(productController));
productRouter.get('/dataimgbyid/:id',productController.getdataimgbyid.bind(productController));
productRouter.post('/dataimgbymanyid',productController.getdataimgbymanyid.bind(productController));
productRouter.post('/create',productController.create.bind(productController));
productRouter.post('/createimg',productController.createimg.bind(productController));
productRouter.delete('/delete/:id',productController.delete.bind(productController));
productRouter.delete('/deleteimg/:id',productController.deleteimg.bind(productController));
productRouter.post('/update',productController.update.bind(productController));
productRouter.post('/updateimg',productController.updateimg.bind(productController));
productRouter.post('/search',productController.search.bind(productController));

export default productRouter;