import { injectable } from "tsyringe";
import { Database } from "../../config/database";

@injectable()

export class evaluateService{
    constructor(private db:Database){}

    async getdata():Promise<any>{
        try{
            const sql = "call getevaluate()";
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

    async create(data:any):Promise<any>{
        try {
            const sql = "call createvaluate(?,?,?,?,?,?)";
            await this.db.query(sql,[data.MaKhachHang,data.SoSao,data.BinhLuan,data.NgayDang,data.HinhAnh,data.MaSanPham])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(data:any):Promise<any>{
        try {
            const sql = "call updateevaluate(?,?,?,?,?,?)";
            await this.db.query(sql,[data.MaKhachHang,data.SoSao,data.BinhLuan,data.NgayDang,data.HinhAnh,data.MaSanPham])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id:number):Promise<any>{
        try{
            const sql = "call deleteevaluate(?)";
            await this.db.query(sql,[id])
            return true;
        }
        catch (error){
            throw new Error(error.message)
        }
    }
}