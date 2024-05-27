import { Router } from "express";
import { container, injectable } from "tsyringe";
import { DetailImportvoiceController } from "../../controllers/admin/detailimportinvoice.controller";
import { authenticate } from "../../middleware/authenticateMiddleware";
const detailimportvoiceRouter = Router();
detailimportvoiceRouter.use(authenticate)

const detailimportvoiceController = container.resolve(DetailImportvoiceController);
detailimportvoiceRouter.get('/data',detailimportvoiceController.get.bind(detailimportvoiceController));
detailimportvoiceRouter.get('/dataid/:id',detailimportvoiceController.getdataid.bind(detailimportvoiceController));
detailimportvoiceRouter.get('/databyid/:id',detailimportvoiceController.getdatabyid.bind(detailimportvoiceController));
detailimportvoiceRouter.post('/create',detailimportvoiceController.create.bind(detailimportvoiceController));
detailimportvoiceRouter.delete('/delete/:id',detailimportvoiceController.delete.bind(detailimportvoiceController));
detailimportvoiceRouter.post('/update',detailimportvoiceController.update.bind(detailimportvoiceController));
detailimportvoiceRouter.post('/search',detailimportvoiceController.search.bind(detailimportvoiceController));

export default detailimportvoiceRouter;