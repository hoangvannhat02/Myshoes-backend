import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { detailproductService } from "../../services/admin/detailproduct.service";

@injectable()

export class DetailProductController{
    constructor(private detailproductservice: detailproductService){}
    async get(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.detailproductservice.getdata();
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
            const results = await this.detailproductservice.getdatabyid(req.params.id);      
            if(results){
                res.json({data:results,result:true});
            }
            else{
                res.json({message:"Bản ghi không tồn tại",data:[],result:false})
            }
        }
        catch(error:any){
            res.json({message:error.message})
        }
    }

    async getdatabyproductid(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.detailproductservice.getdatabyproductid(req.params.id);                  
            if(results){
                res.json({data:results,result:true});
            }
            else{
                res.json({message:"Bản ghi không tồn tại",data:[],result:false})
            }
        }
        catch(error:any){
            res.json({message:error.message})
        }
    }

    
    async create(req:Request,res:Response):Promise<void>{
        try {
            const data = req.body as {MaSanPham: any,MaMau:any,MaKichThuoc:any,GiaBan:any,GiaKhuyenMai:any};           
            const results = await this.detailproductservice.create(data);
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
            const results = await this.detailproductservice.delete(req.params.id);
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
            
            const data = req.body as {MaChiTietSanPham:any,MaMau:any,MaKichThuoc:any,GiaBan:any,GiaKhuyenMai:any};          
            const results = await this.detailproductservice.update(data);
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

    async updateQuantityProduct(req:Request,res:Response):Promise<void>{
        try {
            const data = req.body as {MaChiTietSanPham:any,SoLuongTon:any};    
            console.log(data);
                  
            const results = await this.detailproductservice.updateQuantity(data);
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
            const data = req.body as {searchkeyword:any,pagenumber: any, itemsperpage: any};          
            const results = await this.detailproductservice.search(data);            
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