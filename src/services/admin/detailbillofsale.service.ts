import { injectable } from "tsyringe";
import { Database } from "../../config/database";

@injectable()

export class detailbillofsaleService{
    constructor(private db:Database){}
    async getdata():Promise<any>{
        try{
            const sql = "call getdetailbillofsale()";
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
    async getdatainfocustomerbyid(id:any):Promise<any>{
        try{
            const sql = "call getinfocustomerofdetailbillofsale(?)";
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
            const sql = "call creatdetailbillofsale(?,?)";
            await this.db.query(sql,[data.MaChiTietSanPham,data.MaHoaDon,data.data.SoLuong,data.GiaBan,data.TongTien])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}