import { Router } from "express";
import { container, injectable } from "tsyringe";
import { VoucherController } from "../../controllers/user/voucher.controller";
const voucherRouter = Router();

const voucherController = container.resolve(VoucherController);
voucherRouter.get('/data',voucherController.get.bind(voucherController));
voucherRouter.get('/datatransport',voucherController.getdatatransport.bind(voucherController));
voucherRouter.get('/databyid/:id',voucherController.getdatabyid.bind(voucherController));
voucherRouter.get('/getdatabycustomerid/:id',voucherController.getdatabycustomerid.bind(voucherController));
voucherRouter.post('/update',voucherController.update.bind(voucherController));
voucherRouter.post('/create',voucherController.create.bind(voucherController));
export default voucherRouter;