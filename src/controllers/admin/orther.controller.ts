import { Request, Response } from "express";
import { injectable } from "tsyringe";
import multer from "multer";
import { otherService } from "../../services/admin/orther.service";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Đặt điều kiện để xác định thư mục đích tùy thuộc vào loại ảnh
      let uploadPath = '';
      if (file.fieldname === 'file') {
        uploadPath = 'uploads/products/';
      }else if (file.fieldname === 'logo') {
        uploadPath = 'uploads/logo/';
      }else if (file.fieldname === 'bannermain') {
        uploadPath = 'uploads/bannermain/';
      }else if (file.fieldname === 'bannermid') {
        uploadPath = 'uploads/bannermid/';
      }else if (file.fieldname === 'bannerleft') {
        uploadPath = 'uploads/bannerleft/';
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

export class OrtherController{
    constructor(private ortherservice: otherService){}

    async get(req:Request,res:Response): Promise<void>{
        try{
            const results = await this.ortherservice.getdata();
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
            
            const results = await this.ortherservice.delete(Number(req.params.id));
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
                AnhQuangCaoPhanDau:req.body.AnhQuangCaoPhanDau ?? null,
                AnhQuangCaoPhanGiua:req.body.AnhQuangCaoPhanGiua ?? null,
                AnhQuangCaoBenTrai: req.body.AnhQuangCaoBenTrai ?? null,
                DiaChiCuaHang: req.body.DiaChiCuaHang ?? null,
                DienThoai: req.body.DienThoai ?? null,
                Email: req.body.Email ?? null,
                LienKetFacebook: req.body.LienKetFacebook ?? null,
                LienKetInstagram: req.body.LienKetInstagram ?? null,
                Logo:req.body.Logo ?? null,
                MaThongTinKhac:req.body.MaThongTinKhac ?? null
            }        
            data.Logo = this.normalizePath(data.Logo)
            console.log(data);
            
            const results = await this.ortherservice.update(data);
            
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
    normalizePath(path) {
        return path.replace(/\\/g, '/');
    }
    async create(req:Request,res:Response):Promise<void>{
        try {                        
            const data = {
                AnhQuangCaoPhanDau:req.body.AnhQuangCaoPhanDau ?? null,
                AnhQuangCaoPhanGiua:req.body.AnhQuangCaoPhanGiua ?? null,
                AnhQuangCaoBenTrai: req.body.AnhQuangCaoBenTrai ?? null,
                DiaChiCuaHang: req.body.DiaChiCuaHang ?? null,
                DienThoai: req.body.DienThoai ?? null,
                Email: req.body.Email ?? null,
                LienKetFacebook: req.body.LienKetFacebook ?? null,
                LienKetInstagram: req.body.LienKetInstagram ?? null,
                Logo:req.body.Logo ?? null
            }           
            const results = await this.ortherservice.create(data);
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
        upload.single('logo')(req, res, (err: any) => {
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

    public uploadFileLeft(req: Request, res: Response): void {
      upload.single('bannerleft')(req, res, (err: any) => {
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

    public uploadFileMain(req: Request, res: Response): void {
        upload.single('bannermain')(req, res, (err: any) => {
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

    public uploadFileMid(req: Request, res: Response): void {
        upload.single('bannermid')(req, res, (err: any) => {
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