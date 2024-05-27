import { injectable } from "tsyringe";
import { Database } from "../../config/database";

@injectable()

export class productService{
    constructor(private db:Database){}
    async getdata():Promise<any>{
        try{
            const sql = "call getproducts";
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
            const sql = "call getproductsbyid(?)";
            const [results] = await this.db.query(sql,[id]);     
            if(Array.isArray(results) && results.length > 0){
                return results;
            }
            return null;
        }
        catch(error:any){
            throw new Error(error.message)
        }
    }

    async getdataimgbyid(id:any):Promise<any>{
        try{
            const sql = "call getimgsbyid(?)";
            const [results] = await this.db.query(sql,[id]);
            
            if(Array.isArray(results) && results.length > 0){
                return results;
            }
            return null;
        }
        catch(error:any){
            throw new Error(error.message)
        }
    }

    async getdataimgbymanyid(data:any):Promise<any>{
        try{
            const sql = "call getimgsbymanyid(?,?)";
            const [results] = await this.db.query(sql,[data.MaMau,data.MaChiTietSanPham]);
            
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
            const sql = "call creatproduct(?,?,?,?,?,?,?)";
            await this.db.query(sql,[data.TenSanPham,data.MaLoai,data.MaHang,data.LuotXem,data.TrangThai,data.MoTaNgan,data.MoTa])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createimg(data:any):Promise<any>{
        try {
            const sql = "call createimg(?,?,?)";
            await this.db.query(sql,[data.MaMau,data.MaChiTietSanPham,data.DuongDan])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }


    async delete(id:any):Promise<any>{
        try {
            const sql = "call deleteproduct(?)";
            await this.db.query(sql,[id])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteimg(id:any):Promise<any>{
        try {
            const sql = "call deleteimg(?)";
            await this.db.query(sql,[id])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }


    async update(data:any):Promise<any>{
        try {
            const sql = "call updateproduct(?,?,?,?,?,?,?,?)";
            await this.db.query(sql,[data.MaSanPham,data.TenSanPham,data.MaLoai,data.MaHang,data.LuotXem,Number(data.TrangThai),data.MoTaNgan,data.MoTa]);
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateimg(data:any):Promise<any>{
        try {
            const sql = "call updateimg(?,?,?,?)";
            await this.db.query(sql,[data.MaAnh,data.MaMau,data.MaChiTietSanPham,data.DuongDan]);
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    } 

    async search(search:any):Promise<any>{
        try {
            const sql = "call SearchProducts(?,?,?)";
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