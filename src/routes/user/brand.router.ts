import { Router } from "express";
import { container, injectable } from "tsyringe";
import { BrandController } from "../../controllers/admin/brand.controller";
const brandRouter = Router();

const brandController = container.resolve(BrandController);
brandRouter.get('/data',brandController.get.bind(brandController));
brandRouter.get('/databyid/:id',brandController.getdatabyid.bind(brandController));
brandRouter.post('/create',brandController.create.bind(brandController));
brandRouter.delete('/delete/:id',brandController.delete.bind(brandController));
brandRouter.post('/update',brandController.update.bind(brandController));
brandRouter.post('/search',brandController.search.bind(brandController));

export default brandRouter;