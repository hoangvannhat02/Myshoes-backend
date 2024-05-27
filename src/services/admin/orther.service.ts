import { injectable } from "tsyringe";
import { Database } from "../../config/database";

@injectable()

export class otherService{
    constructor(private db:Database){}

    async getdata():Promise<any>{
        try{
            const sql = "select * from ThongTinKhac";
            const [results] = await this.db.query(sql,[])            
            if(results){
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
            const sql = `
            INSERT INTO ThongTinKhac (AnhQuangCaoPhanDau,AnhQuangCaoPhanGiua,AnhQuangCaoBenTrai,DiaChiCuaHang,DienThoai,Email,LienKetFacebook,LienKetInstagram,Logo) 
            VALUES ('${JSON.stringify(data.AnhQuangCaoPhanDau)}','${JSON.stringify(data.AnhQuangCaoPhanGiua)}','${data.AnhQuangCaoBenTrai}','${data.DiaChiCuaHang}','${data.DienThoai}','${data.Email}','${data.LienKetFacebook}','${data.LienKetInstagram}','${data.Logo}')
            `
            await this.db.queryString(sql)
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(data:any):Promise<any>{
        try {
            const sql = `update thongtinkhac set
                AnhQuangCaoPhanDau = IFNULL('${JSON.stringify(data.AnhQuangCaoPhanDau)}',AnhQuangCaoPhanDau),
                AnhQuangCaoPhanGiua = IFNULL('${JSON.stringify(data.AnhQuangCaoPhanGiua)}',AnhQuangCaoPhanGiua),
                AnhQuangCaoBenTrai = IFNULL('${data.AnhQuangCaoBenTrai}',AnhQuangCaoBenTrai),
                DiaChiCuaHang = IFNULL('${data.DiaChiCuaHang}',DiaChiCuaHang),
                DienThoai = IFNULL('${data.DienThoai}',DienThoai),
                Email = IFNULL('${data.Email}',Email),
                LienKetFacebook = IFNULL('${data.LienKetFacebook}',LienKetFacebook),
                LienKetInstagram = IFNULL('${data.LienKetInstagram}',LienKetInstagram),
                Logo = IFNULL('${(data.Logo).toString()}',Logo)
                where mathongtinkhac = ${data.MaThongTinKhac}
            `;
            await this.db.queryString(sql)
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id:number):Promise<any>{
        try{
            const sql = "delete thongtinkhac where mathongtinkhac = "+id;
            await this.db.queryString(sql)
            return true;
        }
        catch (error){
            throw new Error(error.message)
        }
    }
}