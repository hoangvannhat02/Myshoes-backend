import { injectable } from "tsyringe";
import { Database } from "../../config/database";
import { parse } from "dotenv";

@injectable()

export class newsService{
    constructor(private db:Database){}
    async getdata():Promise<any>{
        try{
            const sql = "call getnews";
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
            const sql = "call getnewsbyid(?)";
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
            const sql = "call creatnews(?,?,?,?,?,?,?)";
            await this.db.query(sql,[data.TieuDe,data.MaChuDeTinTuc,data.NgayTao,data.NoiDung,data.Anh,data.MaNguoiDung,data.TrangThai])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id:any):Promise<any>{
        try {
            const sql = "call deletenews(?)";
            await this.db.query(sql,[id])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(data:any):Promise<any>{
        try {
            const sql = "call updatenews(?,?,?,?,?,?,?,?)";
            await this.db.query(sql,[data.MaTin,data.TieuDe,data.MaChuDeTinTuc,data.NgayTao,data.NoiDung,data.Anh,data.MaNguoiDung,parseInt(data.TrangThai,10)])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async search(search:any):Promise<any>{
        try {
            const sql = "call SearchNews(?,?,?)";
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