import { Router } from "express";
import { container, injectable } from "tsyringe";
import { NewsController } from "../../controllers/admin/news.controller";
import { authenticate, checkPermission } from "../../middleware/authenticateMiddleware";
const newsRouter = Router();

const newsController = container.resolve(NewsController);

newsRouter.use(authenticate);

newsRouter.get('/data',checkPermission('quanly'),newsController.get.bind(newsController));
newsRouter.get('/databyid/:id',checkPermission('quanly'),newsController.getdatabyid.bind(newsController));
newsRouter.post('/create',checkPermission('quanly'),newsController.create.bind(newsController));
newsRouter.delete('/delete/:id',checkPermission('quanly'),newsController.delete.bind(newsController));
newsRouter.post('/uploadfile',checkPermission('quanly'),newsController.uploadFile.bind(newsController));
newsRouter.delete('/deleteimg',checkPermission('quanly'),newsController.deleteimg.bind(newsController));
newsRouter.post('/update',checkPermission('quanly'),newsController.update.bind(newsController));
newsRouter.post('/search',checkPermission('quanly'),newsController.search.bind(newsController));

export default newsRouter;