import { injectable } from "tsyringe";
import { Database } from "../../config/database";

@injectable()

export class detailproductService{
    constructor(private db:Database){}
    async getdata():Promise<any>{
        try{
            const sql = "call getdetailproducts";
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
            const sql = "call getdetailproductsbyid(?)";
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

    async getdatabyproductid(id:any):Promise<any>{
        try{
            const sql = "call getdetailproductsid(?)";
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
            const sql = "call creatdetailproduct(?,?,?,?,?)";
            await this.db.query(sql,[data.MaSanPham,data.MaMau,data.MaKichThuoc,data.GiaBan,data.GiaKhuyenMai])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id:any):Promise<any>{
        try {
            const sql = "call deletedetailproduct(?)";
            await this.db.query(sql,[id])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(data:any):Promise<any>{
        try {
            const sql = "call updatedetailproduct(?,?,?,?,?)";
            await this.db.query(sql,[data.MaChiTietSanPham,data.MaMau,data.MaKichThuoc,data.GiaBan,data.GiaKhuyenMai]);
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateQuantity(data:any):Promise<any>{
        try {
            const sql = "call updateQuantityProduct(?,?)";
            await this.db.query(sql,[data.MaChiTietSanPham,Number(data.SoLuongTon)]);
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async search(search:any):Promise<any>{
        try {
            const sql = "call SearchDetailProducts(?,?,?)";
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