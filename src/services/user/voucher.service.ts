import { injectable } from "tsyringe";
import { Database } from "../../config/database";

@injectable()

export class voucherService{
    constructor(private db:Database){}
    async getdata():Promise<any>{
        try{
            const sql = "call getvoucher";
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

    async getdatatransport():Promise<any>{
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
            const sql = "call getvoucherbyid(?)";
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

    async getdatabycustomerid(id:any):Promise<any>{
        try{
            const sql = "call getvoucherbyuseridandvoucherid(?)";
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
            const sql = "call creatvouchercustomer(?,?,?)";
            console.log(data);
            await this.db.query(sql,[data.MaKhachHang,data.MaPhieu,data.SoLuong])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id:any):Promise<any>{
        try {
            const sql = "call deletevoucher(?)";
            await this.db.query(sql,[id])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(data:any):Promise<any>{
        try {
            const sql = "call updatevoucher(?,?,?,?,?,?,?)";
            await this.db.query(sql,[data.MaPhieu,data.MaLoaiPhieu,data.TenPhieu,data.SoLuong,data.SoLuongDaDung,data.NgayBatDau,data.NgayKetThuc])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async search(search:any):Promise<any>{
        try {
            const sql = "call SearchVouchers(?,?,?)";
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