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

    async getdatanew():Promise<any>{
        try{
            const sql = "call getbillofsalenew";
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

    async getbillofsalebycustomerid(id:any):Promise<any>{
        try{
            const sql = "call getbillofsalebycustomerid(?)";
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

    async getdatainfoproductbyid(id:any):Promise<any>{
        try{
            const sql = "call getinfoproductofdetailbillofsale(?)";
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
            const sql = "call creatbillofsale(?,?,?,?,?,?,?,?,?,?,?)";
            await this.db.query(sql,[data.MaKhachHang,data.NgayTao,data.DiaChiNhan,data.MaVanChuyen,data.MaPhieu,data.TrangThai,data.HinhThucThanhToan,data.TongTien,data.DienThoai,data.NguoiNhan,data.trangthaithanhtoan])
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

    async delete(id:any):Promise<any>{
        try {
            const sql = "call deletebillofsale(?)";
            await this.db.query(sql,[id])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

}