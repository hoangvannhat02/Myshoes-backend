import { injectable } from "tsyringe";
import { Database } from "../../config/database";

@injectable()

export class detailbillofsaleService{
    constructor(private db:Database){}
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

    async create(data:any):Promise<any>{
        try {
            const sql = "call creatdetailbillofsale(?,?,?,?,?)";
            await this.db.query(sql,[data.MaHoaDon,data.MaChiTietSanPham,data.SoLuong,data.GiaBan,data.TongTien])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}