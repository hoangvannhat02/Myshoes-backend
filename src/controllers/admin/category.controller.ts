import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { categoryService } from "../../services/admin/category.service";

@injectable()

export class CategoryController{
    constructor(private categoryservice: categoryService){}
    async get(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.categoryservice.getdata();
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
            const results = await this.categoryservice.getdatabyid(req.params.id);      
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
            const data = req.body as {TenLoai: any, MoTa: any};           
            const results = await this.categoryservice.create(data);
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
            const results = await this.categoryservice.delete(req.params.id);
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
            const data = req.body as {MaLoai:any,TenLoai: any, MoTa: any};          
            const results = await this.categoryservice.update(data);
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
            const results = await this.categoryservice.search(data);            
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