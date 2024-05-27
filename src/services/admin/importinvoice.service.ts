import { injectable } from "tsyringe";
import { Database } from "../../config/database";

@injectable()

export class importinvoiceService{
    constructor(private db:Database){}
    async getdata():Promise<any>{
        try{
            const sql = "call getimportinvoices";
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
            const sql = "call getimportinvoicesbyid(?)";
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
            const sql = "call creatimportinvoice(?,?,?)";
            await this.db.query(sql,[data.MaNhaCungCap,data.MaNguoiDung,data.NgayNhap])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id:any):Promise<any>{
        try {
            const sql = "call deleteimportinvoice(?)";
            await this.db.query(sql,[id])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(data:any):Promise<any>{
        try {
            const sql = "call updateimportinvoice(?,?,?,?)";
            await this.db.query(sql,[data.MaHoaDonNhap,data.MaNhaCungCap,data.MaNguoiDung,data.NgayNhap]);
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async search(search:any):Promise<any>{
        try {
            const sql = "call SearchImportinvoices(?,?,?)";
            const results = await this.db.query(sql,[search.searchkeyword,search.pagenumber,search.itemsperpage]); 
            console.log(results)           
            if(Array.isArray(results) && results.length > 0){                
                return results;
            }
            return null;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}