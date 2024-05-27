import { injectable } from "tsyringe";
import { Database } from "../../config/database";
import * as bcrypt from 'bcryptjs';
import { log } from "handlebars";

@injectable()

export class customerService{
    constructor(private db:Database){}

    async getdatabyid(id:any):Promise<any>{
        try{
            const sql = "call getcustomerbyid(?)";
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

    async getdata():Promise<any>{
        try{
            const sql = "call getcustomer()";
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
            const sql = "call getcustomernew()";
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
            const sql = "call creatcustomer(?,?,?,?,?,?,?,?,?,?)";
            await this.db.query(sql,[data.PassWord,data.Anh,data.HoVaTen,data.SoDienThoai,data.Email,data.DiaChi,data.XacThucEmail,data.XacThucSoDienThoai,data.IdGoogle,data.IdUserFacebook])
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async login(data:any):Promise<any>{
        try {
            const sql = `select * from Khachhang where email = '${data.Email}'`;
            const results = await this.db.queryString(sql)
            if(Array.isArray(results) && results.length > 0){
                const user = results[0];
                const hashedPasswordFromDB = user.PassWord;
                const providedPassword = data.PassWord;

                const passMatch = await hashedPasswordFromDB.includes(providedPassword)
                const passwordsMatch = await bcrypt.compare(providedPassword, hashedPasswordFromDB);
                
                if (passwordsMatch || passMatch) {                    
                    return user;
                } else {
                    return null;
                }
            }
            return null;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(data:any):Promise<any>{
        try {            
            const sql = "call updatecustomer(?,?,?,?,?,?,?)";
            await this.db.query(sql,[data.MaKhachHang,data.PassWord,data.Anh,data.HoVaTen,data.SoDienThoai,data.Email,data.DiaChi]);
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}