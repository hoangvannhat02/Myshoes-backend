import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { productService } from "../../services/admin/product.service";

@injectable()

export class ProductController{
    constructor(private productservice: productService){}
    async get(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.productservice.getdata();
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
            const results = await this.productservice.getdatabyid(req.params.id);      
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

    async getdataimgbyid(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.productservice.getdataimgbyid(req.params.id);      
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

    async getdataimgbymanyid(req:Request,res:Response): Promise<void>{
        try{
            const data = req.body as {MaMau:any,MaChiTietSanPham:any};
            const results = await this.productservice.getdataimgbymanyid(data);
                  
            if(results){
                res.json({data:results,result:true});
            }
            else{
                res.json({message:"Bản ghi không tồn tại",result:false})
            }
        }
        catch(error:any){
            res.json({message:error.message})
        }
    }

    async create(req:Request,res:Response):Promise<void>{
        try {
            const data = req.body as {TenSanPham: any,MaLoai:any,MaHang:any,LuotXem:any,TrangThai:any,MoTaNgan:any,MoTa:any};          
            const results = await this.productservice.create(data);
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

    async createimg(req:Request,res:Response):Promise<void>{
        try {
            const data = req.body as {MaMau: any,MaChiTietSanPham:any,DuongDan:any};          
            const results = await this.productservice.createimg(data);
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
            const results = await this.productservice.delete(req.params.id);
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

    async deleteimg(req:Request,res:Response):Promise<void>{
        try {
            const results = await this.productservice.deleteimg(req.params.id);
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
            const data = req.body as {MaSanPham:any,TenSanPham: any,MaLoai:any,MaHang:any,LuotXem:any,TrangThai:any,MoTaNgan:any,MoTa:any};          
            const results = await this.productservice.update(data);
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
    
    async updateimg(req:Request,res:Response):Promise<void>{
        try {
            const data = req.body as {MaAnh:any,MaMau: any,MaChiTietSanPham:any,DuongDan:any};          
            const results = await this.productservice.updateimg(data);
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
            const results = await this.productservice.search(data);            
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