import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { productService } from "../../services/user/product.service";

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
            const data = req.body as {proid:any,colorid:any}
            const results = await this.productservice.getdatabyid(data);      
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

    async getsizebyid(req:Request,res:Response): Promise<void>{
        try{
            const data = req.body as {proid:any,colorid:any};
            const results = await this.productservice.getsizebyid(data);      
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

    async getquantyofsizebyid(req:Request,res:Response): Promise<void>{
        try{
            const data = req.body as {proid:any,colorid:any,sizeid:any};
            const results = await this.productservice.getquantyofsizebyid(data);      
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

    async getimgbydetailproendcolorid(req:Request,res:Response): Promise<void>{
        try{
            const data = req.body as {detailproid:any,colorid:any}
            const results = await this.productservice.getimgbydetailproendcolorid(data);      
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

    
    async getdatabycateid(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.productservice.getdatabycateid(req.params.id);      
            if(results){
                res.json(results);
            }
            else{
                res.json([])
            }
        }
        catch(error:any){
            res.json({message:error.message})
        }
    }

    async getdataproductbyid(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.productservice.getdataproductbyid(req.params.id);      
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

    async getcolorbyproid(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.productservice.getcolorbyid(req.params.id);      
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

}