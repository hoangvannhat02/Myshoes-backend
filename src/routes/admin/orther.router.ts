import { Router } from "express";
import { container, injectable } from "tsyringe";
import { OrtherController} from "../../controllers/admin/orther.controller";
const ortherRouter = Router();

const ortherController = container.resolve(OrtherController);
ortherRouter.get('/getdata',ortherController.get.bind(ortherController));
ortherRouter.post('/create',ortherController.create.bind(ortherController));
ortherRouter.post('/update',ortherController.update.bind(ortherController));
ortherRouter.post('/uploadfile',ortherController.uploadFile.bind(ortherController));
ortherRouter.post('/uploadfilemain',ortherController.uploadFileMain.bind(ortherController));
ortherRouter.post('/uploadfilemid',ortherController.uploadFileMid.bind(ortherController));
ortherRouter.post('/uploadfileleft',ortherController.uploadFileLeft.bind(ortherController));
ortherRouter.delete('/delete/:id',ortherController.delete.bind(ortherController));

export default ortherRouter;