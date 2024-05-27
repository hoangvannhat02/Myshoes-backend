import { Request, Response } from "express";
import { injectable } from "tsyringe";
import multer from "multer";
import { evaluateService } from "../../services/user/evaluate.service";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Đặt điều kiện để xác định thư mục đích tùy thuộc vào loại ảnh
      let uploadPath = '';
      if (file.fieldname === 'file') {
        uploadPath = 'uploads/products/';
      } else if (file.fieldname === 'userImage') {
        uploadPath = 'uploads/users/';
      }else if (file.fieldname === 'feedbackImage'){
        uploadPath = 'uploads/feedback'
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

export class EvaluateController{
    constructor(private evaluateservice: evaluateService){}

    async get(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.evaluateservice.getdata();
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

    async delete(req:Request,res:Response):Promise<void>{
        try {
            
            const results = await this.evaluateservice.delete(Number(req.params.id));
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
            const data = {
                MaKhachHang:req.body.MaKhachHang ?? null,
                SoSao:req.body.SoSao ?? null,
                BinhLuan: req.body.BinhLuan ?? null,
                NgayDang: req.body.NgayDang ?? null,
                HinhAnh: req.body.HinhAnh ?? null,
                MaSanPham: req.body.MaSanPham ?? null,
            }             
            const results = await this.evaluateservice.update(data);
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

    async create(req:Request,res:Response):Promise<void>{
        try {                        
            const data = {
                MaKhachHang:req.body.MaKhachHang ?? null,
                SoSao:req.body.SoSao ?? null,
                BinhLuan: req.body.BinhLuan ?? null,
                NgayDang: req.body.NgayDang ?? null,
                HinhAnh: req.body.HinhAnh ?? null,
                MaSanPham: req.body.MaSanPham ?? null,
            }           
            const results = await this.evaluateservice.create(data);
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

    public uploadFile(req: Request, res: Response): void {
        upload.single('feedbackImage')(req, res, (err: any) => {
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
}