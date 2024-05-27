import { injectable } from "tsyringe";
import { Database } from "../../config/database";

@injectable()

export class categoryService{
    constructor(private db:Database){}
    async getdata():Promise<any>{
        try{
            const sql = "call getcategoriesdata";
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

    async getdatabyid(id:any):Promise<any>{
        try{
            const sql = "call getcategoriesdatabyid(?)";
            const [results] = await this.db.query(sql,[id])
            if(Array.isArray(results) && results.length > 0){
                return results;
            }
            return null;
        }
        catch(error:any){
            throw new Error(error.message)
        }
    }

    async create(categories:any):Promise<any>{
        try {
            const sql = "call creatcategory(?,?)";
            await this.db.query(sql,[categories.TenLoai,categories.MoTa])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id:any):Promise<any>{
        try {
            const sql = "call deletecategory(?)";
            await this.db.query(sql,[id])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(categories:any):Promise<any>{
        try {
            const sql = "call editcategories(?,?,?)";
            await this.db.query(sql,[categories.MaLoai,categories.TenLoai,categories.MoTa]);
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async search(search:any):Promise<any>{
        try {
            const sql = "call SearchCategories(?,?,?)";
            const results = await this.db.query(sql,[search.searchkeyword,search.pagenumber,search.itemsperpage]); 
            if(Array.isArray(results) && results.length > 0){                
                return results;
            }
            return null;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}