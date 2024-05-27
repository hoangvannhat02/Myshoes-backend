import { injectable } from "tsyringe";
import { Database } from "../../config/database";

@injectable()

export class productService{
    constructor(private db:Database){}
    async getdata():Promise<any>{
        try{
            const sql = "call getalldatadetailproduct";
            const [results] = await this.db.query(sql,[])
            if(Array.isArray(results) && results.length > 0){
                return results;
            }
            return null;
        }
        catch(error:any){
            throw new Error(error.message)
        }
    }

    async getdatabyid(data:any):Promise<any>{
        try{
        const sql = "call getdetailimgproductbydetailproductid(?,?)";
        const [results] = await this.db.query(sql,[data.proid,data.colorid]);     
            if(Array.isArray(results) && results.length > 0){
                return results;
            }
            return null;
        }
        catch(error:any){
            throw new Error(error.message)
        }
    }

    async getcolorbyid(id:any):Promise<any>{
        try{
        const sql = "call getdatacolorbyproductid(?)";
        const [results] = await this.db.query(sql,[id]);     
            if(Array.isArray(results) && results.length > 0){
                return results;
            }
            return null;
        }
        catch(error:any){
            throw new Error(error.message)
        }
    }

    async getdataproductbyid(id:any):Promise<any>{
        try{
        const sql = "call getdatabyproductid(?)";
        const [results] = await this.db.query(sql,[id]);     
            if(Array.isArray(results) && results.length > 0){
                return results;
            }
            return null;
        }
        catch(error:any){
            throw new Error(error.message)
        }
    }

    async getsizebyid(data:any):Promise<any>{
        try{
        const sql = "call getdatasizebyproductid(?,?)";
        const [results] = await this.db.query(sql,[data.proid,data.colorid]);     
            if(Array.isArray(results) && results.length > 0){
                return results;
            }
            return null;
        }
        catch(error:any){
            throw new Error(error.message)
        }
    }

    async getquantyofsizebyid(data:any):Promise<any>{
        try{
        const sql = "call getquantyofsizeid(?,?,?)";
        const [results] = await this.db.query(sql,[data.proid,data.colorid,data.sizeid]);     
            if(Array.isArray(results) && results.length > 0){
                return results;
            }
            return null;
        }
        catch(error:any){
            throw new Error(error.message)
        }
    }
    async getimgbydetailproendcolorid(data:any):Promise<any>{
        try{
        const sql = "call getimgbydetailproandcolorid(?,?)";
        const [results] = await this.db.query(sql,[data.detailproid,data.colorid]);     
            if(Array.isArray(results) && results.length > 0){
                return results;
            }
            return null;
        }
        catch(error:any){
            throw new Error(error.message)
        }
    }

    async getdatabycateid(id:any):Promise<any>{
        try{
            const sql = "call getproductsbycateid(?)";
            const [results] = await this.db.query(sql,[id]);     
            if(Array.isArray(results) && results.length > 0){
                return results;
            }
            return null;
        }
        catch(error:any){
            throw new Error(error.message)
        }
    }
}