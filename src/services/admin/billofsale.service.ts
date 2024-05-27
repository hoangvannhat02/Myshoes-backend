import { injectable } from "tsyringe";
import { Database } from "../../config/database";

@injectable()

export class billofsaleService{
    constructor(private db:Database){}
    async getdata():Promise<any>{
        try{
            const sql = "call getbillofsale";
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

    async getbestsellingproduct():Promise<any>{
        try{
            const sql = "call getbestsellingproduct";
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
            const sql = "call getbillofsalebyid(?)";
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
            const sql = "call creatbillofsale(?,?,?,?,?,?,?,?)";
            await this.db.query(sql,[data.MaKhachHang,data.NgayTao,data.DiaChiNhan,data.TrangThai,data.MaVanChuyen,data.MaPhieu,data.HinhThucThanhToan,data.TongTien])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id:any):Promise<any>{
        try {
            const sql = "call deletebillofsale(?)";
            await this.db.query(sql,[id])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(data:any):Promise<any>{
        try {
            const sql = "call updatestatusbillofsale(?,?,?)";
            await this.db.query(sql,[data.MaHoaDon,data.TrangThai,data.trangthaithanhtoan]);
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async search(search:any):Promise<any>{
        try {
            const sql = "call SearchBillofsale(?,?,?,?)";
            const results = await this.db.query(sql,[search.searchkeyword,search.pagenumber,search.itemsperpage,search.status]); 
            if(Array.isArray(results) && results.length > 0){                
                return results;
            }
            return null;
        } catch (error) {
            throw new Error(error.message)
        }
    }

 
}