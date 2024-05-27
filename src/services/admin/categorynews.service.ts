import { injectable } from "tsyringe";
import { Database } from "../../config/database";

@injectable()

export class categorynewsService{
    constructor(private db:Database){}
    async getdata():Promise<any>{
        try{
            const sql = "call getcategorydetailnews";
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
            const sql = "call getcategorydetailnewsbyid(?)";
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

    async create(data:any):Promise<any>{
        try {
            const sql = "call creatcategorynews(?)";
            await this.db.query(sql,[data.TenChuDe])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id:any):Promise<any>{
        try {
            const sql = "call deletecategorynews(?)";
            await this.db.query(sql,[id])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(data:any):Promise<any>{
        try {
            const sql = "call updatecategorynews(?,?)";
            await this.db.query(sql,[data.MaChuDeTinTuc,data.TenChuDe]);
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async search(search:any):Promise<any>{
        try {
            const sql = "call SearchCategoryNews(?,?,?)";
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