import { Router } from "express";
import { container, injectable } from "tsyringe";
import { CategoryNewsController } from "../../controllers/admin/categorynews.controller";
import { authenticate } from "../../middleware/authenticateMiddleware";
const categorynewsRouter = Router();
categorynewsRouter.use(authenticate)

const categorynewsController = container.resolve(CategoryNewsController);
categorynewsRouter.get('/data',categorynewsController.get.bind(categorynewsController));
categorynewsRouter.get('/databyid/:id',categorynewsController.getdatabyid.bind(categorynewsController));
categorynewsRouter.post('/create',categorynewsController.create.bind(categorynewsController));
categorynewsRouter.delete('/delete/:id',categorynewsController.delete.bind(categorynewsController));
categorynewsRouter.post('/update',categorynewsController.update.bind(categorynewsController));
categorynewsRouter.post('/search',categorynewsController.search.bind(categorynewsController));

export default categorynewsRouter;