import { Router } from "express";
import 'reflect-metadata';
import categoryRouter from "./category.router";
import colorRouter from "./color.router";
import sizeRouter from "./size.router";
import brandRouter from "./brand.router";
import supplierRouter from "./supplier.router";
import userRouter from "./user.router";
import importinvoiceRouter from "./importinvoice.router";
import productRouter from "./product.router";
import detailimportvoiceRouter from "./detailimportvoice.route";
import detailproductRouter from "./detailproduct.router";
import billofsaleRouter from "./billofsale.router";
import detailbillofsaleRouter from "./detailbillofsale.router";
import categoryvoucherRouter from "./categoryvoucher.router";
import categorynewsRouter from "./categorynews.router";
import newsRouter from "./news.router";
import voucherRouter from "./voucher.router";
import transportRouter from "./transport.router";
import ortherRouter from "./orther.router";

const router = Router();

router.use('/category',categoryRouter);
router.use('/color',colorRouter);
router.use('/size',sizeRouter);
router.use('/brand',brandRouter);
router.use('/supplier',supplierRouter);
router.use('/user',userRouter);
router.use('/importinvoice',importinvoiceRouter);
router.use('/product',productRouter);
router.use('/detailproduct',detailproductRouter);
router.use('/detailimportinvoice',detailimportvoiceRouter);
router.use('/billofsale',billofsaleRouter);
router.use('/detailbillofsale',detailbillofsaleRouter);
router.use('/categoryvoucher',categoryvoucherRouter);
router.use('/categorynews',categorynewsRouter);
router.use('/voucher',voucherRouter);
router.use('/news',newsRouter);
router.use('/transport',transportRouter);
router.use("/orther",ortherRouter)


export default router;