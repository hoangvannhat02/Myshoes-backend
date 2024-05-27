import { Router } from "express";
import { container, injectable } from "tsyringe";
import { CategoryController } from "../../controllers/user/categoryproduct.controller";
const categoryRouter = Router();

const categoryController = container.resolve(CategoryController);
categoryRouter.get('/data',categoryController.get.bind(categoryController));
categoryRouter.get('/databyid/:id',categoryController.getdatabyid.bind(categoryController));

export default categoryRouter;