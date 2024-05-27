import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { detailimportinvoiceService } from "../../services/admin/detailimportinvoice.service";

@injectable()

export class DetailImportvoiceController{
    constructor(private detailimportvoiceservice: detailimportinvoiceService){}
    async get(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.detailimportvoiceservice.getdata();
            if(results){
                res.json(results);
            }
            else{
                res.json({message:"Bản ghi không tồn tại"})
            }
        }
        catch(error:any){
            res.json({message:error.message})
        }
    }

    async getdataid(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.detailimportvoiceservice.getdataid(req.params.id);      
            if(results){
                res.json(results);
            }
            else{
                res.json({message:"Bản ghi không tồn tại"})
            }
        }
        catch(error:any){
            res.json({message:error.message})
        }
    }


    async getdatabyid(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.detailimportvoiceservice.getdatabyid(req.params.id);      
            if(results){
                res.json(results);
            }
            else{
                res.json({message:"Bản ghi không tồn tại"})
            }
        }
        catch(error:any){
            res.json({message:error.message})
        }
    }

    async create(req:Request,res:Response):Promise<void>{
        try {
            const data = req.body as {MaHoaDonNhap:any,MaChiTietSanPham: any,SoLuong:any,GiaNhap:any};           
            const results = await this.detailimportvoiceservice.create(data);
            if(results){
                res.json({message:"Thêm bản ghi thành công",result:true})
            }
            else{
                res.json({message:"Thêm thất bại",result:true})
            }
        } catch (error:any) {
            res.json({message:error.message})
        }
    }

    async delete(req:Request,res:Response):Promise<void>{
        try {
     
            const results = await this.detailimportvoiceservice.delete(req.params.id);
            if(results){
                res.json({message:"Xóa bản ghi thành công",result:true})
            }
            else{
                res.json({message:"Có lỗi xảy ra",result:false})
            }
        } catch (error:any) {
            res.json({message:error.message})
        }
    }

    async update(req:Request,res:Response):Promise<void>{
        try {       
            const data = req.body as {MaChiTietHoaDonNhap:any,MaHoaDonNhap:any,MaChiTietSanPham: any,SoLuong:any,GiaNhap:any};          
            const results = await this.detailimportvoiceservice.update(data);
         
            if(results){
                res.json({message:"Sửa bản ghi thành công",result:true})
            }
            else{
                res.json({message:"Đã có lỗi xảy ra",result:false})
            }
        } catch (error:any) {
            res.json({message:error.message})
        }
    }

    async search(req:Request,res:Response):Promise<void>{
        try {                        
            const data = req.body as {searchkeyword:any,pagenumber: any, itemsperpage: any};          
            const results = await this.detailimportvoiceservice.search(data);            
            if(results){
                res.json(results)
            }
            else{
                res.json([])
            }
        } catch (error:any) {
            res.json({message:error.message})
        }
    }
}