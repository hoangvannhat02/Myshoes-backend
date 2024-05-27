import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { detailbillofsaleService } from "../../services/admin/detailbillofsale.service";

@injectable()

export class DetailBillofsaleController{
    constructor(private detailbillofsaleservice: detailbillofsaleService){}
    async getdatainfoproductsbyid(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.detailbillofsaleservice.getdatainfoproductbyid(req.params.id);      
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

    async getdata(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.detailbillofsaleservice.getdata();    
            console.log(results);
              
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

    async getdatainfocustomerbyid(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.detailbillofsaleservice.getdatainfocustomerbyid(req.params.id);      
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
            const data = req.body as {MaChiTietSanPham:any, MaHoaDon:any, SoLuong:any, GiaBan:any, TongTien:any};           
            const results = await this.detailbillofsaleservice.create(data);
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
}