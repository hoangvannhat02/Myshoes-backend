import { Router } from "express";
import { container, injectable } from "tsyringe";
import { CustomerController } from "../../controllers/user/customer.controller";
const customerRouter = Router();

const customerController = container.resolve(CustomerController);
customerRouter.get('/databyid/:id',customerController.getdatabyid.bind(customerController));
customerRouter.get('/getdata',customerController.getdata.bind(customerController));
customerRouter.get('/getdatanew',customerController.getdatanew.bind(customerController));
customerRouter.post('/create',customerController.create.bind(customerController));
customerRouter.post('/update',customerController.update.bind(customerController));
customerRouter.post('/login',customerController.login.bind(customerController));
customerRouter.post('/uploadfile',customerController.uploadFile.bind(customerController));
customerRouter.delete('/deleteimg',customerController.deleteimg.bind(customerController));
customerRouter.post('/sendverifyemail',customerController.sendVerifyEmail.bind(customerController));
customerRouter.post('/sendemail',customerController.sendEmail.bind(customerController));
customerRouter.post('/sendemailnewpassword',customerController.sendEmailNewPassword.bind(customerController));
customerRouter.get('/verifyemail',customerController.verifyEmail.bind(customerController));

export default customerRouter;