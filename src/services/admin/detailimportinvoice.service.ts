import { injectable } from "tsyringe";
import { Database } from "../../config/database";

@injectable()

export class detailimportinvoiceService{
    constructor(private db:Database){}
    async getdata():Promise<any>{
        try{
            const sql = "call getdetailimportinvoice";
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

    async getdataid(id:any):Promise<any>{
        try{
            const sql = "call getdetailimportinvoicebyid(?)";
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

    async getdatabyid(id:any):Promise<any>{
        try{
            const sql = "call getdetailimportinvoicesbyid(?)";
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
            const sql = "call creatdetailimportinvoice(?,?,?,?)";
            await this.db.query(sql,[data.MaHoaDonNhap,data.MaChiTietSanPham,data.SoLuong,data.GiaNhap])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id:any):Promise<any>{
        try {
            const sql = "call deletedetailimportinvoice(?)";
            await this.db.query(sql,[id])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(data:any):Promise<any>{
        try {           
            const sql = "call updatedetailimportinvoice(?,?,?,?,?)";
            await this.db.query(sql,[data.MaChiTietHoaDonNhap,data.MaHoaDonNhap,data.MaChiTietSanPham,data.SoLuong,data.GiaNhap]);
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async search(search:any):Promise<any>{
        try {
            const sql = "call SearchDetailImportinvoice(?,?,?)";
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