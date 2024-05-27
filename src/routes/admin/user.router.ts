import { Router } from "express";
import { container, injectable } from "tsyringe";
import { UserController } from "../../controllers/admin/user.controller";
import { authenticate, checkPermission } from "../../middleware/authenticateMiddleware";
const userRouter = Router();

const userController = container.resolve(UserController);
// userRouter.use(authenticate);

userRouter.get('/data',authenticate,userController.get.bind(userController));
userRouter.get('/databyid/:id',authenticate,userController.getdatabyid.bind(userController));
userRouter.post('/create',authenticate,userController.create.bind(userController));
userRouter.delete('/delete/:id',authenticate,userController.delete.bind(userController));
userRouter.post('/update',authenticate,userController.update.bind(userController));
userRouter.post('/login',userController.login.bind(userController));
userRouter.post('/checkemailuser',authenticate,userController.checkemailuser.bind(userController));
userRouter.post('/search',authenticate,checkPermission('quanly'),userController.search.bind(userController));
userRouter.post('/uploadfile',authenticate,userController.uploadFile.bind(userController));
userRouter.delete('/deleteimg',authenticate,userController.deleteimg.bind(userController));

export default userRouter;