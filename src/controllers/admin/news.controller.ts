import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { newsService } from "../../services/admin/news.service";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Đặt điều kiện để xác định thư mục đích tùy thuộc vào loại ảnh
      let uploadPath = 'uploads/news/';
    
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const fs = require('fs');
const path = require('path');
const upload = multer({ storage: storage });

@injectable()

export class NewsController{
    constructor(private newsservice: newsService){}
    async get(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.newsservice.getdata();
            if(results){
                res.json(results);
            }
            else{
                res.json({message:"Bản ghi không tồn tại"})
            }
        }
        catch(error:any){
            res.json({message:error.message})
        }
    }

    async getdatabyid(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.newsservice.getdatabyid(req.params.id);      
            if(results){
                res.json(results);
            }
            else{
                res.json({message:"Bản ghi không tồn tại"})
            }
        }
        catch(error:any){
            res.json({message:error.message})
        }
    }

    async create(req:Request,res:Response):Promise<void>{
        try {       
            const data = req.body as {TieuDe:any,MaChuDeTinTuc:any,NgayTao:any,NoiDung:any,Anh:any,MaNguoiDung:any,TrangThai:any};           
            const results = await this.newsservice.create(data);
            if(results){
                res.json({message:"Thêm bản ghi thành công",result:true})
            }
            else{
                res.json({message:"Thêm thất bại",result:true})
            }
        } catch (error:any) {
            res.json({message:error.message})
        }
    }

    async delete(req:Request,res:Response):Promise<void>{
        try {
            const results = await this.newsservice.delete(req.params.id);
            if(results){
                res.json({message:"Xóa bản ghi thành công",result:true})
            }
            else{
                res.json({message:"Có lỗi xảy ra",result:false})
            }
        } catch (error:any) {
            res.json({message:error.message})
        }
    }

    async update(req:Request,res:Response):Promise<void>{
        try {      
            console.log(req.body);      
            const data = req.body as {MaTin:any,TieuDe:any,MaChuDeTinTuc:any,NgayTao:any,NoiDung:any,Anh:any,MaNguoiDung:any,TrangThai:any};          
            const results = await this.newsservice.update(data);
            if(results){
                res.json({message:"Sửa bản ghi thành công",result:true})
            }
            else{
                res.json({message:"Đã có lỗi xảy ra",result:false})
            }
        } catch (error:any) {
            res.json({message:error.message})
        }
    }

    async search(req:Request,res:Response):Promise<void>{
        try {                        
            const data = req.body as {searchkeyword:any,pagenumber: any, itemsperpage: any};          
            const results = await this.newsservice.search(data);            
            if(results){
                res.json(results)
            }
            else{
                res.json([])
            }
        } catch (error:any) {
            res.json({message:error.message})
        }
    }

    public uploadFile(req: Request, res: Response): void {
        upload.single('newImage')(req, res, (err: any) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
    
          if (!req.file) {
            return res.status(400).send('No file uploaded.');
          }
    
          const filePath = req.file.path;
          return res.status(200).json({ message: 'File uploaded successfully.', url: filePath });
        });
    }
    public deleteimg(req:Request, res:Response):void {
        const imageName = req.query.imageName;
        const imagePath = path.join(__dirname,'../../..', imageName); // Thay đổi đường dẫn thư mục nếu cần
        
        // Kiểm tra xem tệp tin tồn tại hay không
        if (fs.existsSync(imagePath)) {
          // Nếu tồn tại, thực hiện xóa tệp tin
          console.log("Tồn tại");
          
          fs.unlinkSync(imagePath);
          res.json({ success: true, message: 'File đã được xóa thành công.' });
        } else {
          res.status(404).json({ success: false, message: 'File không tồn tại.' });
        }
      };
}