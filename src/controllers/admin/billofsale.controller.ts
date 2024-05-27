import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { billofsaleService } from "../../services/admin/billofsale.service";

@injectable()

export class BillofsaleController{
    constructor(private billofsaleservice: billofsaleService){}
    async get(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.billofsaleservice.getdata();
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
            const results = await this.billofsaleservice.getdatabyid(req.params.id);      
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
            const data = req.body as {MaKhachHang:any, NgayTao:any, DiaChiNhan:any, TrangThai:any, MaVanChuyen:any, MaPhieu:any, HinhThucThanhToan:any, TongTien:any};           
            const results = await this.billofsaleservice.create(data);
            if(results){
                res.json({message:"Thêm bản ghi thành công", result:true})
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
            const results = await this.billofsaleservice.delete(req.params.id);
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

    async getbestsellingproduct(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.billofsaleservice.getbestsellingproduct();
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

    async update(req:Request,res:Response):Promise<void>{
        try {            
            const data = req.body as {MaHoaDon:any,TrangThai:any,trangthaithanhtoan:any};                  
            const results = await this.billofsaleservice.update(data);
            if(results){
                res.json({message:"Duyệt thành công",result:true})
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
            const data = req.body as {searchkeyword:any,pagenumber: any, itemsperpage: any,status:any};          
            const results = await this.billofsaleservice.search(data);            
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