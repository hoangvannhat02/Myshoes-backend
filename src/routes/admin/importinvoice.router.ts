import { Router } from "express";
import { container, injectable } from "tsyringe";
import { ImportinvoiceController } from "../../controllers/admin/importinvoice.controller";
import { authenticate } from "../../middleware/authenticateMiddleware";
const importinvoiceRouter = Router();
importinvoiceRouter.use(authenticate)

const importinvoiceController = container.resolve(ImportinvoiceController);
importinvoiceRouter.get('/data',importinvoiceController.get.bind(importinvoiceController));
importinvoiceRouter.get('/databyid/:id',importinvoiceController.getdatabyid.bind(importinvoiceController));
importinvoiceRouter.post('/create',importinvoiceController.create.bind(importinvoiceController));
importinvoiceRouter.delete('/delete/:id',importinvoiceController.delete.bind(importinvoiceController));
importinvoiceRouter.post('/update',importinvoiceController.update.bind(importinvoiceController));
importinvoiceRouter.post('/search',importinvoiceController.search.bind(importinvoiceController));

export default importinvoiceRouter;