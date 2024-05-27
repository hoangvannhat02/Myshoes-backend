import { Router } from "express";
import productRouter from "./product.router";
import categoryRouter from "./categoryproduct.router";
import customerRouter from "./customer.router";
import voucherRouter from "./voucher.router";
import detailbillofsaleRouter from "./detailbillofsale.router";
import billofsaleRouter from "./billofsale.router";
import evaluateRouter from "./evaluate.router";
import colorRouter from "./color.router";
import sizeRouter from "./size.router";
import brandRouter from "./brand.router";
const router = Router();

router.use('/categoryproduct',categoryRouter);
router.use('/product',productRouter);
router.use("/customer",customerRouter);
router.use("/voucher",voucherRouter);
router.use("/billofsale",billofsaleRouter);
router.use("/evaluate",evaluateRouter);
router.use("/detailbillofsale",detailbillofsaleRouter);
router.use("/color",colorRouter);
router.use("/size",sizeRouter)
router.use("/brand",brandRouter)
export default router;