import { injectable } from "tsyringe";
import { Database } from "../../config/database";

@injectable()

export class transportService{
    constructor(private db:Database){}
    async getdata():Promise<any>{
        try{
            const sql = "call gettransport";
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
            const sql = "call gettransportbyid(?)";
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
            const sql = "call creattransport(?,?)";
            await this.db.query(sql,[data.TenVanChuyen,data.Gia])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id:any):Promise<any>{
        try {
            const sql = "call deletetransport(?)";
            await this.db.query(sql,[id])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(data:any):Promise<any>{
        try {
            const sql = "call updatetransport(?,?,?)";
            await this.db.query(sql,[data.MaVanChuyen,data.TenVanChuyen,data.Gia]);
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async search(search:any):Promise<any>{
        try {
            const sql = "call SearchTransports(?,?,?)";
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