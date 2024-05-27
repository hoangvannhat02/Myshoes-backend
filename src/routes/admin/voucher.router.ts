import { Router } from "express";
import { container, injectable } from "tsyringe";
import { VoucherController } from "../../controllers/admin/voucher.controller";
import { authenticate } from "../../middleware/authenticateMiddleware";
const voucherRouter = Router();

voucherRouter.use(authenticate)

const voucherController = container.resolve(VoucherController);
voucherRouter.get('/data',voucherController.get.bind(voucherController));
voucherRouter.get('/databyid/:id',voucherController.getdatabyid.bind(voucherController));
voucherRouter.post('/create',voucherController.create.bind(voucherController));
voucherRouter.delete('/delete/:id',voucherController.delete.bind(voucherController));
voucherRouter.post('/update',voucherController.update.bind(voucherController));
voucherRouter.post('/search',voucherController.search.bind(voucherController));

export default voucherRouter;