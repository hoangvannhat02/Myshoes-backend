import express, { Request, Response , Application } from 'express';
const cors = require('cors');
const bodyPaser = require('body-parser');
import routerAdmin from './routes/admin';
import routerUser from './routes/user';
import multer from 'multer';

const pay = require('./pay')

const fs = require('fs');
const path = require('path');

const app: Application = express();
const port = process.env.PORT || 8000;


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: '*'
}));

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

// Tạo một instance của Multer middleware
const upload = multer({ storage: storage });
app.use('/uploads/products', express.static('uploads/products'));
app.use('/uploads/users', express.static('uploads/users'));
app.use('/uploads/news', express.static('uploads/news'));
app.use('/uploads/customers', express.static('uploads/customers'));
app.use('/uploads/feedback', express.static('uploads/feedback'));
app.use('/uploads/logo', express.static('uploads/logo'));
app.use('/uploads/bannermain', express.static('uploads/bannermain'));
app.use('/uploads/bannermid', express.static('uploads/bannermid'));
app.use('/uploads/bannerleft', express.static('uploads/bannerleft'));

app.use(express.static('public'));

// Định nghĩa route xử lý việc tải lên tệp
app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Xử lý thành công việc tải lên tệp
  const filePath = req.file.path;
  return res.status(200).send({message:'File uploaded successfully.',url:filePath});
});

app.delete('/api/deleteImage', (req, res) => {
  const imageName = req.query.imageName;
  
  const imagePath = path.join(__dirname,'..', imageName); // Thay đổi đường dẫn thư mục nếu cần
  
  // Kiểm tra xem tệp tin tồn tại hay không
  if (fs.existsSync(imagePath)) {
    // Nếu tồn tại, thực hiện xóa tệp tin    
    fs.unlinkSync(imagePath);
    res.json({ success: true, message: 'File đã được xóa thành công.' });
  } else {
    res.status(404).json({ success: false, message: 'File không tồn tại.' });
  }
});


app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',routerAdmin)
app.use('/user',routerUser)
app.use('/order',pay)


app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});