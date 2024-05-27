import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { sizeService } from "../../services/admin/size.service";

@injectable()

export class SizeController{
    constructor(private sizeservice: sizeService){}
    async get(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.sizeservice.getdata();
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
            const results = await this.sizeservice.getdatabyid(req.params.id);      
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
            const data = req.body as {TenKichThuoc: any};           
            const results = await this.sizeservice.create(data);
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
            const results = await this.sizeservice.delete(req.params.id);
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
            console.log(req.body);
            
            const data = req.body as {MaKichThuoc:any,TenKichThuoc: any};          
            const results = await this.sizeservice.update(data);
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
            const results = await this.sizeservice.search(data);            
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