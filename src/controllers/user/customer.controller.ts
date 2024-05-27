import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { customerService } from "../../services/user/customer.service";
import multer from 'multer';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';
import { environment } from '../../config/env';
import { Database } from "../../config/database";
import Handlebars = require("handlebars");

sgMail.setApiKey(environment.SENDGRID_API_KEY);

Handlebars.registerHelper('concat', function(...args) {
    args.pop();
    return args.join(' - ');
});
Handlebars.registerHelper('formatNumber', function(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/customers');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const fs = require('fs');
const path = require('path');
const upload = multer({ storage: storage });

@injectable()

export class CustomerController {
    constructor(private customerservice: customerService,private db:Database) {
    }
    async getdatabyid(req: Request, res: Response): Promise<void> {
        try {
            const results = await this.customerservice.getdatabyid(req.params.id);
            if (results) {
                res.json(results);
            }
            else {
                res.json({ message: "Bản ghi không tồn tại" })
            }
        }
        catch (error: any) {
            res.json({ message: error.message })
        }
    }

    async getdata(req: Request, res: Response): Promise<void> {
        try {
            const results = await this.customerservice.getdata();
            if (results) {
                res.json(results);
            }
            else {
                res.json({ message: "Bản ghi không tồn tại" })
            }
        }
        catch (error: any) {
            res.json({ message: error.message })
        }
    }

    async getdatanew(req: Request, res: Response): Promise<void> {
        try {
            const results = await this.customerservice.getdatanew();
            if (results) {
                res.json(results);
            }
            else {
                res.json({ message: "Bản ghi không tồn tại" })
            }
        }
        catch (error: any) {
            res.json({ message: error.message })
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const data = {
                PassWord: req.body.PassWord ?? "",
                Anh: req.body.Anh ?? "",
                HoVaTen: req.body.HoVaTen ?? "",
                SoDienThoai: req.body.SoDienThoai ?? "",
                Email: req.body.Email ?? "",
                DiaChi: req.body.DiaChi ?? "",
                XacThucEmail: req.body.XacThucEmail ?? 0,
                XacThucSoDienThoai: req.body.XacThucSoDienThoai ?? 0,
                IdGoogle: req.body.IdGoogle ?? "",
                IdUserFacebook: req.body.IdUserFacebook ?? ""
            };
            console.log(data);

            const results = await this.customerservice.create(data);
            if (results) {
                res.json({ message: "Thêm bản ghi thành công", result: true })
            }
            else {
                res.json({ message: "Thêm thất bại", result: false })
            }
        } catch (error: any) {
            res.json({ message: error.message })
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body as { Email: any, PassWord: any };
            const results = await this.customerservice.login(data);

            if (results) {
                res.json({ message: "Đăng nhập thành công", result: [results] })
            }
            else {
                res.json({ message: "Thêm thất bại", result: [] })
            }
        } catch (error: any) {
            res.json({ message: error.message })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const data = {
                MaKhachHang: req.body.MaKhachHang ?? null,
                PassWord: req.body.PassWord ?? null,
                Anh: req.body.Anh ?? null,
                HoVaTen: req.body.HoVaTen ?? null,
                SoDienThoai: req.body.SoDienThoai ?? null,
                Email: req.body.Email ?? null,
                DiaChi: req.body.DiaChi ?? null
            };
            const results = await this.customerservice.update(data);
            
            if (results) {
                res.json({ message: "Sửa bản ghi thành công", result: true })
            }
            else {
                res.json({ message: "Đã có lỗi xảy ra", result: false })
            }
        } catch (error: any) {
            res.json({ message: error.message })
        }
    }
    public uploadFile(req: Request, res: Response): void {
        upload.single('customerImage')(req, res, (err: any) => {
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

    public deleteimg(req: Request, res: Response): void {
        const imageName = req.query.imageName;

        const imagePath = path.join(__dirname, '../../..', imageName); // Thay đổi đường dẫn thư mục nếu cần

        // Kiểm tra xem tệp tin tồn tại hay không
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            res.json({ success: true, message: 'File đã được xóa thành công.' });
        } else {
            res.status(404).json({ success: false, message: 'File không tồn tại.' });
        }
    };

    public async sendVerifyEmail(req: Request, res: Response): Promise<void> {        
        const { email } = req.body
        if (!email) {
            res.status(400).send("Email is required")
        }
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationLink = `http://localhost:8000/user/customer/verifyemail?token=${verificationToken}&email=${email}`;

        const msg = {
            to: email as string,
            from: 'nhathoang07032002@gmail.com',
            subject: 'Email Verification',
            text: `Please verify your email by clicking the following link: ${verificationLink}`,
            html: `<p>Please verify your email by clicking the following link: <a href="${verificationLink}">${verificationLink}</a></p>`,
        };

        try {
            await sgMail.send(msg);            
            res.status(200).send('Verification email sent');
        } catch (error) {
            if (error.response) {
                console.error(error.response.body);
            }
            res.status(500).send('Internal Server Error');
        }
    }

    public async sendEmail(req: Request, res: Response): Promise<void> {        
        const { email,bill,products } = req.body
        console.log("Bill >>> ",bill)
        console.log("Product >>> ",products)
        if (!email) {
            res.status(400).send("Email is required")
        }

        const filepath = path.join(__dirname,'../../../templates/template-send-email.html')
        const source = fs.readFileSync(filepath,'utf-8').toString()
        const template = Handlebars.compile(source)
        
        const replacements = {
            email:email,
            products:products.map(product => ({
                ProductName: product.ProductName,
                ProductPrice: product.ProductPrice,
                Quantity:product.Quantity,
                ColorName:product.ColorName,
                SizeName: product.SizeName,
                ProductPath:'http://localhost:8000/'+product.ProductPath
            })),
            bill:bill,
            total_price: bill.TongTien.toString()
        }

        const htmlToSend = template(replacements)

        const msg = {
            to: email as string,
            from: {
                email:'nhathoang07032002@gmail.com',
                name:'Myshoes'
            },
            subject: 'Đơn hàng đã đặt thành công',
            text: `Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi, rất hân hạnh được phục vụ cho quý khách`,
            html: htmlToSend
        };

        try {
            await sgMail.send(msg);            
        } catch (error) {
            if (error.response) {
                console.error(error.response.body);
            }
            res.status(500).send('Internal Server Error');
        }
    }

    public async sendEmailNewPassword(req: Request, res: Response): Promise<void> {        
        const { email,newpassword } = req.body
        if (!email) {
            res.status(400).send("Email is required")
        }

        const filepath = path.join(__dirname,'../../../templates/template-send-newpassword.html')
        const source = fs.readFileSync(filepath,'utf-8').toString()
        const template = Handlebars.compile(source)
        
        const replacements = {
            email:email,
            newpassword:newpassword
        }

        const htmlToSend = template(replacements)

        const msg = {
            to: email as string,
            from: {
                email:'nhathoang07032002@gmail.com',
                name:'Myshoes'
            },
            subject: 'Tạo mật khẩu mới thành công',
            text: `Cảm ơn bạn đã sử dụng dịch vụ của cửa hàng của chúng tôi, rất hân hạnh được phục vụ cho quý khách`,
            html: htmlToSend
        };

        try {
            await sgMail.send(msg);  
            res.status(200).json('ok')          
        } catch (error) {
            if (error.response) {
                console.error(error.response.body);
            }
            res.status(500).send('Internal Server Error');
        }
        
    }

    public async verifyEmail(req: Request, res: Response): Promise<void>{        
        const { token, email } = req.query;
        if (!token || !email) {
            res.json('Invalid request');
        }

        const isValid = await this.db.queryString(`select * from khachhang where email = '${email}'`);
        if(isValid.length > 0 && Array.isArray(isValid)){
            if(isValid[0].XacThucEmail === 0){
                this.db.queryString(`update khachhang set XacThucEmail = 1 where email = '${email}'`)
            }
        }
        res.status(200).send('Email verified successfully')
    }

}