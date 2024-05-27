import express,{ Request, Response,Application } from "express";
import { injectable } from "tsyringe";
import { userService } from "../../services/admin/user.service";
import multer from 'multer';
import { Authentication } from "../../config/jwt";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Đặt điều kiện để xác định thư mục đích tùy thuộc vào loại ảnh
      let uploadPath = '';
      if (file.fieldname === 'file') {
        uploadPath = 'uploads/products/';
      } else if (file.fieldname === 'userImage') {
        uploadPath = 'uploads/users/';
      }
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

export class UserController{
    constructor(private userservice: userService,private readonly authService:Authentication){}
    async get(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.userservice.getdata();
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
            const results = await this.userservice.getdatabyid(req.params.id);      
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

    async login(req:Request,res:Response): Promise<void>{
        try{
            const data = req.body as {Email:any,PassWord:any};
           
            const results = await this.userservice.login(data);
            
            if(results){
                const token = this.authService.generateToken(results)                
                
                res.json({results,token});
            }
            else{
                res.json({message:"Bản ghi không tồn tại"})
            }
        }
        catch(error:any){
            res.json({message:error.message})
        }
    }

    async checkemailuser(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.userservice.checkemailuser(req.body.Email);      
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
            const data = req.body as {PassWord:any,NgaySinh:any,Anh:any,HoTen:any,DienThoai:any,Email:any,DiaChi:any,Quyen:any,TrangThai:any};           
            const results = await this.userservice.create(data);
            if(results){
                res.json({message:"Thêm bản ghi thành công",result:true})
            }
            else{
                res.json({message:"Thêm thất bại",result:false})
            }
        } catch (error:any) {
            res.json({message:error.message})
        }
    }

    async delete(req:Request,res:Response):Promise<void>{
        try {
            const results = await this.userservice.delete(req.params.id);
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
            const data = req.body as {MaNguoiDung:any,PassWord:any,NgaySinh:any,Anh:any,HoTen:any,DienThoai:any,Email:any,DiaChi:any,Quyen:any,TrangThai:any};          
            const results = await this.userservice.update(data);
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
            const results = await this.userservice.search(data);            
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
        upload.single('userImage')(req, res, (err: any) => {
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
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          res.json({ success: true, message: 'File đã được xóa thành công.' });
        } else {
          res.status(404).json({ success: false, message: 'File không tồn tại.' });
        }
      };
}