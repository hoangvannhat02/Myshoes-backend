import { Router } from "express";
import { container, injectable } from "tsyringe";
import { CategoryController } from "../../controllers/admin/category.controller";
import userRouter from "./user.router";
import { authenticate } from "../../middleware/authenticateMiddleware";
const categoryRouter = Router();
userRouter.use(authenticate)

const categoryController = container.resolve(CategoryController);
categoryRouter.get('/data',categoryController.get.bind(categoryController));
categoryRouter.get('/databyid/:id',categoryController.getdatabyid.bind(categoryController));
categoryRouter.post('/create',categoryController.create.bind(categoryController));
categoryRouter.delete('/delete/:id',categoryController.delete.bind(categoryController));
categoryRouter.post('/update',categoryController.update.bind(categoryController));
categoryRouter.post('/search',categoryController.search.bind(categoryController));

export default categoryRouter;