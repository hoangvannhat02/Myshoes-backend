import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { categoryService } from "../../services/user/categoryproduct.service";

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
}