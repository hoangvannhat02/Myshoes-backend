create table loaisanpham(
	MaLoai int auto_increment primary key,
    TenLoai varchar(300),
    MoTa varchar(400)
);

create table hang(
	MaHang int auto_increment primary key,
    TenHang varchar(300),
    MoTa varchar(400)
);

create table mausac(
	MaMau int auto_increment primary key,
    TenMau varchar(200)
);

create table kichthuoc(
	MaKichThuoc int auto_increment primary key,
    TenKichThuoc varchar(200)
);

create table sanpham(
	MaSanPham int auto_increment primary key,
    TenSanPham varchar(300),
    MaLoai int,
    MaHang int,
    LuotXem int,
    TrangThai bit,
    MoTaNgan varchar(300),
    MoTa varchar(3000),
    FOREIGN KEY (MaLoai) REFERENCES LoaiSanPham(MaLoai),
    FOREIGN KEY (MaHang) REFERENCES Hang(MaHang)
);

create table chitietsanpham(
	MaChiTietSanPham int auto_increment primary key,
    MaSanPham int,
    MaMau int,
    MaKichThuoc int,
    GiaBan float,
    GiaKhuyenMai float,
    SoLuongTon int,
    FOREIGN KEY (MaMau) REFERENCES MauSac(MaMau),
    FOREIGN KEY (MaKichThuoc) REFERENCES KichThuoc(MaKichThuoc),
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham)
);

create table hinhanh(
	MaAnh int auto_increment primary key,
    MaMau int,
    DuongDan varchar(500),
    FOREIGN KEY (MaMau) REFERENCES MauSac(MaMau)
);

create table vanchuyen(
	MaVanChuyen int auto_increment primary key,
    TenVanChuyen varchar(300),
    Gia float
);

create table loaiphieugiamgia(
	MaLoaiPhieu int auto_increment primary key,
    LoaiPhieu varchar(100),
    GiaTri float,
    GiaTriNhoNhat float,
    GiaTriLonNhat float
);

create table phieugiamgia(
	MaPhieu int auto_increment primary key,
    TenPhieu nvarchar(300),
    MaLoaiPhieu int,
    SoLuong int,
    SoLuongDaDung int,
    NgayBatDau Date,
    NgayKetThuc Date,
	FOREIGN KEY (MaLoaiPhieu) REFERENCES loaiphieugiamgia(MaLoaiPhieu) 
);

create table khachhang_phieugiamgia(
	MaKhachHang int,
    MaPhieu int,
    SoLuong int,
	FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang),
    FOREIGN KEY (MaPhieu) REFERENCES PhieuGiamGia(MaPhieu)
);

CREATE TABLE NhaCungCap (
	MaNhaCungCap INT auto_increment PRIMARY KEY,
	HoTen VARCHAR (255) NOT NULL,
	DiaChi varchar(255),
	DienThoai varchar(10),
	Email VARCHAR(100)
);

CREATE TABLE HoaDonNhap (
	MaHoaDonNhap INT auto_increment PRIMARY KEY,
	MaNhaCungCap INT not null,
	MaNguoiDung INT NOT NULL,
	NgayNhap datetime,
	FOREIGN KEY (MaNhaCungCap) REFERENCES NhaCungCap (MaNhaCungCap),
	FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung (MaNguoiDung) 
);

CREATE TABLE ChiTietHoaDonNhap (
	MaChiTietHoaDonNhap int primary key,
	MaHoaDonNhap INT,
	MaChiTietSanPham int,
	SoLuong INT ,
	GiaNhap float,
	FOREIGN KEY (MaHoaDonNhap) REFERENCES HoaDonNhap (MaHoaDonNhap),
	FOREIGN KEY (MaChiTietSanPham) REFERENCES ChiTietSanPham (MaChiTietSanPham)
);

CREATE TABLE ChuDeTinTuc (
	MaChuDeTintuc INT auto_increment PRIMARY KEY,
	TenChuDe varchar(100)
);

CREATE TABLE TinTuc (
	MaTin INT auto_increment PRIMARY KEY,
	TieuDe varchar(100),
    MaChuDeTintuc int,
	NgayTao date,
	NoiDung text NULL,
	Anh VARCHAR(200),
	MaNguoiDung INT,
	TrangThai bit,
	FOREIGN KEY (MaNguoiDung) REFERENCES NguoiDung (MaNguoiDung),
    FOREIGN KEY (MaChuDeTintuc) REFERENCES ChuDeTinTuc (MaChuDeTintuc)
);

create table danhgia(
	MaDanhGia int auto_increment PRIMARY KEY,
    MaKhachHang int,
    MaSanPham int,
    SoSao int,
    BinhLuan nvarchar(500),
    NgayDang datetime,
    HinhAnh nvarchar(100),
    FOREIGN KEY (MaKhachHang) REFERENCES KhachHang (MaKhachHang),
    FOREIGN KEY (MaSanPham) REFERENCES SanPham (MaSanPham)
);

create table NguoiDung(
	MaNguoiDung INT auto_increment PRIMARY KEY,
	PassWord varchar(500) null,
	NgaySinh Date,
	Anh VARCHAR(100),
	HoTen VARCHAR(100),
	DienThoai VARCHAR (10),
	Email VARCHAR(100),
	DiaChi varchar(255),
    Quyen varchar(100),
	TrangThai bit
);

Create Table KhachHang(
	MaKhachHang int auto_increment PRIMARY KEY,
	UserName VARCHAR(500) null,
	PassWord VARCHAR(500) null,
	HoVaTen varchar(200),
	DiaChi VARCHAR(500),
	SoDienThoai char(10),
	Email VARCHAR(200)
);
SELECT LENGTH(PassWord), LENGTH(REPLACE(PassWord, '\r', '')) FROM KhachHang WHERE MaKhachHang = 11;
UPDATE KhachHang
SET PassWord = REPLACE(PassWord, '\r', '');

CREATE TABLE HoaDonBan (
	MaHoaDon INT auto_increment PRIMARY KEY,
	MaKhachHang INT null,
	NgayTao DATETime,
	DiaChiNhan varchar(250),
	TrangThai int,
    MaVanChuyen int,
    MaPhieu int,
	HinhThucThanhToan varchar(400),
	TongTien float,
	FOREIGN KEY (MaKhachHang) REFERENCES KhachHang (MaKhachHang) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE hoadonban
ADD COLUMN DienThoaiNhan char(10) default null;
ALTER TABLE hoadonban
ADD COLUMN NguoiNhan varchar(500) default null;

ALTER TABLE khachhang
ADD COLUMN IdGoogle varchar(100);
ALTER TABLE khachhang
ADD COLUMN IdUserFacebook varchar(100);
ALTER TABLE khachhang
ADD COLUMN XacThucEmail int default 0;
ALTER TABLE khachhang
ADD COLUMN XacThucSoDienThoai int default 0;


CREATE TABLE ChiTietHoaDonBan (
	MaChiTietSanPham INT not null,
	MaHoaDon INT not null ,
	SoLuong INT,
    GiaBan float,
	TongTien float,
	FOREIGN KEY (MaChiTietSanPham) REFERENCES ChiTietSanPham (MaChiTietSanPham) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (MaHoaDon) REFERENCES HoaDonBan (MaHoaDon) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ThongTinKhac(
	AnhQuangCaoPhanDau json,
    AnhQuangCaoPhanGiua json,
    AnhQuangCaoBenTrai VARCHAR(500),
    DiaChiCuaHang varchar(500),
    DienThoai varchar(10),
    Email varchar(255),
    LienKetFacebook varchar(100),
    LienKetInstagram varchar(100),
    Logo varchar(500)
);

ALTER TABLE thongtinkhac
MODIFY COLUMN Email varchar(255);

INSERT INTO hang (TenHang, MoTa) VALUES
('Nike', 'Hãng giày thể thao nổi tiếng toàn cầu.'),
('Adidas', 'Nổi tiếng với các sản phẩm thể thao và lifestyle.'),
('Puma', 'Chuyên sản xuất giày và đồ thể thao.'),
('Converse', 'Nổi tiếng với giày sneakers và lifestyle.'),
('Vans', 'Chuyên sản xuất giày skateboard và lifestyle.'),
('Reebok', 'Hãng thể thao và giày chạy.'),
('New Balance', 'Chuyên về giày chạy và thể thao.'),
('Under Armour', 'Nổi tiếng với các sản phẩm thể thao và đồ dùng thể thao.'),
('ASICS', 'Chuyên về giày chạy và thể thao.'),
('Balenciaga', 'Hãng thời trang và giày cao cấp.');

INSERT INTO mausac (TenMau) VALUES ('Đỏ');
INSERT INTO mausac (TenMau) VALUES ('Xanh');
INSERT INTO mausac (TenMau) VALUES ('Vàng');
INSERT INTO mausac (TenMau) VALUES ('Trắng');

INSERT INTO kichthuoc (TenKichThuoc) VALUES ('Size 36');
INSERT INTO kichthuoc (TenKichThuoc) VALUES ('Size 37');
INSERT INTO kichthuoc (TenKichThuoc) VALUES ('Size 38');
INSERT INTO kichthuoc (TenKichThuoc) VALUES ('Size 39');
INSERT INTO kichthuoc (TenKichThuoc) VALUES ('Size 40');
--- ========================================================================================
-- Loại sản phẩm
DELIMITER //
create procedure creatcategory(
	tenloai varchar(400),
    mota varchar(400)
)
begin
	insert into loaisanpham(tenloai,mota)
    values(tenloai,mota);
end
// DELIMITER ;

DELIMITER //
create procedure deletecategory(
	id int
)
begin
	delete from loaisanpham
    where maloai = id;
end
// DELIMITER ;
DELIMITER //

CREATE PROCEDURE SearchCategories(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM loaisanpham
    WHERE tenloai LIKE CONCAT('%', searchKeyword, '%') or mota LIKE CONCAT('%', searchKeyword, '%');

    -- Tìm kiếm và trả về kết quả phân trang
    SELECT *
    FROM loaisanpham
    WHERE tenloai LIKE CONCAT('%', searchKeyword, '%') or mota LIKE CONCAT('%', searchKeyword, '%')
    LIMIT offsetValue, itemsPerPage;
END //

DELIMITER ;

CALL SearchCategories('giay', 1, 2);

-- ======================================= trigger ==============================================
DELIMITER //

CREATE TRIGGER tr_update_phieugiamgia
AFTER INSERT ON khachhang_phieugiamgia
FOR EACH ROW
BEGIN
    DECLARE remaining_quantity INT;
    
    -- Lấy số lượng còn lại trong phieugiamgia
    SELECT SoLuong - NEW.SoLuong INTO remaining_quantity
    FROM phieugiamgia
    WHERE MaPhieu = NEW.MaPhieu;
    
    -- Trường hợp số lượng mới lớn hơn số lượng còn lại, giảm số lượng trong phieugiamgia xuống 0
    IF remaining_quantity < 0 THEN
        SET remaining_quantity = 0;
    END IF;
    -- Cập nhật số lượng trong phieugiamgia
    UPDATE phieugiamgia
    SET SoLuong = remaining_quantity
    WHERE MaPhieu = NEW.MaPhieu;
    
END //

DELIMITER ;

DROP TRIGGER IF EXISTS tr_update_phieugiamgia;


-- ============================== Màu =======================================
DELIMITER                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
create procedure getcolors()
begin
	select * from mausac;
end //
DELIMITER ;

DELIMITER //
create procedure getcolorsbyid(id int)
begin
	select * from mausac where mamau = id;
end //
DELIMITER ;

DELIMITER //
create procedure creatcolor(
	tenmau varchar(400)
)
begin
	insert into mausac(tenmau)
    values(tenmau);
end
// DELIMITER ;

DELIMITER //
create procedure deletecolor(
	id int
)
begin
	delete from mausac
    where mamau = id;
end
// DELIMITER ;

DELIMITER //
create procedure updatecolor(
	id int,
    _tenmau varchar(500)
)
begin
	update mausac set tenmau = _tenmau
    where mamau = id;
end
// DELIMITER ;

DELIMITER //
CREATE PROCEDURE SearchColors(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM mausac
    WHERE TenMau LIKE CONCAT('%', searchKeyword, '%');

    -- Tìm kiếm và trả về kết quả phân trang
    SELECT *
    FROM mausac
    WHERE TenMau LIKE CONCAT('%', searchKeyword, '%')
    LIMIT offsetValue, itemsPerPage;
END //

DELIMITER ;
call getcolors;

-- ==================================== đánh giá ================================
DELIMITER //                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
create procedure getevaluate()
begin
	select * from 
    danhgia dg inner join khachhang kh on dg.MaKhachHang = kh.MaKhachHang;
end //
DELIMITER ;

call getevaluate;

DELIMITER //
create procedure createvaluate(
	_makhachhang int,
    _sosao int,
    _binhluan varchar(500),
    _ngaydang datetime,
   _hinhanh varchar(100),
   _masanpham int
)
begin
	insert into danhgia(MaKhachhang,sosao,binhluan,ngaydang,hinhanh,masanpham)
    values(_makhachhang,_sosao,_binhluan,_ngaydang,_hinhanh,_masanpham);
end
// DELIMITER ;

DELIMITER //
create procedure deleteevaluate(
	id int
)
begin
	delete from danhgia
    where madanhgia = id;
end
// DELIMITER ;

DELIMITER //
create procedure updateevaluate(
	id int,
    _makhachhang int,
    _sosao int,
    _binhluan varchar(500),
    _ngaydang datetime,
   _hinhanh varchar(100),
   _masanpham int
)
begin
	update danhgia set 
		MaKhachHang = IF(_makhachhang IS NOT NULL, _makhachhang, MaKhachHang),
        SoSao = IF(_sosao IS NOT NULL, _sosao, SoSao),
        BinhLuan = IF(_binhluan IS NOT NULL, _binhluan, BinhLuan),
        NgayDang = IF(_ngaydang IS NOT NULL, _ngaydang, NgayDang),
        HinhAnh = IF(_hinhanh IS NOT NULL, _hinhanh, HinhAnh),
        MaSanPham = IF(_masanpham IS NOT NULL, _masanpham, MaSanPham)
    where madanhgia = id;
end
// DELIMITER ;


-- ==================================== Hãng ===================================
DELIMITER //
create procedure getbrands()
begin
	select * from hang;
end //
DELIMITER ;

DELIMITER //
create procedure getbrandsbyid(id int)
begin
	select * from hang where mahang = id;
end //
DELIMITER ;

DELIMITER //
create procedure creatbrand(
	_tenhang varchar(400),
    _mota varchar(1000)
)
begin
	insert into hang(tenhang,mota)
    values(_tenhang,_mota);
end
// DELIMITER ;

DELIMITER //
create procedure deletebrand(
	id int
)
begin
	delete from hang
    where mahang = id;
end
// DELIMITER ;

DELIMITER //
create procedure updatebrand(
	id int,
    _tenhang varchar(500),
    _mota varchar(1000)
)
begin
	update hang set tenhang = _tenhang, mota = _mota
    where mahang = id;
end
// DELIMITER ;

DELIMITER //
CREATE PROCEDURE SearchBrands(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM hang
    WHERE TenHang LIKE CONCAT('%', searchKeyword, '%') or MoTa LIKE CONCAT('%', searchKeyword, '%');

    -- Tìm kiếm và trả về kết quả phân trang
    SELECT *
    FROM hang
    WHERE TenHang LIKE CONCAT('%', searchKeyword, '%') or MoTa LIKE CONCAT('%', searchKeyword, '%')
    LIMIT offsetValue, itemsPerPage;
END //

DELIMITER ;

-- ==================================== Kích thước ===================================
DELIMITER //
create procedure getsizes()
begin
	select * from kichthuoc;
end //
DELIMITER ;

DELIMITER //
create procedure getsizesbyid(id int)
begin
	select * from kichthuoc where makichthuoc = id;
end //
DELIMITER ;

DELIMITER //
create procedure creatsize(
	_tenkichthuoc varchar(400)
)
begin
	insert into kichthuoc(tenkichthuoc)
    values(_tenkichthuoc);
end
// DELIMITER ;

DELIMITER //
create procedure deletesize(
	id int
)
begin
	delete from kichthuoc
    where makichthuoc = id;
end
// DELIMITER ;

DELIMITER //
create procedure updatesize(
	id int,
    _tenkichthuoc varchar(500)
)
begin
	update kichthuoc set tenkichthuoc = _tenkichthuoc
    where makichthuoc = id;
end
// DELIMITER ;

DELIMITER //
CREATE PROCEDURE SearchSizes(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM kichthuoc
    WHERE tenkichthuoc LIKE CONCAT('%', searchKeyword, '%');

    -- Tìm kiếm và trả về kết quả phân trang
    SELECT *
    FROM kichthuoc
    WHERE tenkichthuoc LIKE CONCAT('%', searchKeyword, '%')
    LIMIT offsetValue, itemsPerPage;
END //

DELIMITER ;

-- ==================================== Nhà cung cấp ===================================
DELIMITER //
create procedure getsuppliers()
begin
	select * from nhacungcap;
end //
DELIMITER ;

DELIMITER //
create procedure getsuppliersbyid(id int)
begin
	select * from nhacungcap where MaNhaCungCap = id;
end //
DELIMITER ;

DELIMITER //
create procedure creatsupplier(
	_hoten varchar(400),
    _diachi varchar(500),
    _dienthoai varchar(20),
    _email varchar(300)
)
begin
	insert into nhacungcap(hoten,diachi,dienthoai,email)
    values(_hoten,_diachi,_dienthoai,_email);
end
// DELIMITER ;

DELIMITER //
create procedure deletesupplier(
	id int
)
begin
	delete from nhacungcap
    where MaNhaCungCap = id;
end
// DELIMITER ;

DELIMITER //
create procedure updatesupplier(
	id int,
    _hoten varchar(400),
    _diachi varchar(500),
    _dienthoai varchar(20),
    _email varchar(300)
)
begin
	update nhacungcap 
    set hoten = _hoten,
		diachi=_diachi,
        dienthoai = _dienthoai,
        email = _email
    where manhacungcap = id;
end
// DELIMITER ;

DELIMITER //
CREATE PROCEDURE SearchSuppliers(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM nhacungcap
    WHERE hoten LIKE CONCAT('%', searchKeyword, '%') or diachi LIKE CONCAT('%', searchKeyword, '%') or dienthoai LIKE CONCAT('%', searchKeyword, '%') or email LIKE CONCAT('%', searchKeyword, '%');
    
    -- Tìm kiếm và trả về kết quả phân trang
    SELECT *
    FROM nhacungcap
        WHERE hoten LIKE CONCAT('%', searchKeyword, '%') or diachi LIKE CONCAT('%', searchKeyword, '%') or dienthoai LIKE CONCAT('%', searchKeyword, '%') or email LIKE CONCAT('%', searchKeyword, '%')
    LIMIT offsetValue, itemsPerPage;
END //

DELIMITER ;

-- ==================================== Khách hàng ===================================
DELIMITER //
create procedure getcustomerbyid(id int)
begin
	select * from khachhang where makhachhang = id;
end //
DELIMITER ;

DELIMITER //
create procedure getcustomernew()
begin
	select * from khachhang 
    order by MaKhachHang desc
    limit 1;
end //
DELIMITER ;

DELIMITER //
create procedure getcustomer()
begin
	select * from khachhang;
end //
DELIMITER ;

DELIMITER //
create procedure logincustomer(_email varchar(300), _password varchar(300))
begin
	select * from khachhang where email = _email and PassWord = _password;
end //
DELIMITER ;
call logincustomer('nhathoang07032002@gmail.com','12345');
DELIMITER //
create procedure creatcustomer(
	_password varchar(500),
    _anh varchar(300),
	_hoten varchar(400),
    _dienthoai varchar(20),
    _email varchar(300),
    _diachi varchar(500),
    _xacthucemail int,
    _xacthucsdt int,
    _idgoogle varchar(100),
    _idfacebook varchar(100)
)
begin
	insert into khachhang(password,anh,hovaten,sodienthoai,email,diachi,xacthucemail,xacthucsodienthoai,idgoogle,iduserfacebook)
    values(_password,_anh,_hoten,_dienthoai,_email,_diachi,_xacthucemail,_xacthucsdt,_idgoogle,_idfacebook);
end
// DELIMITER ;

DELIMITER //
create procedure updatecustomer(
	id int,
    _password varchar(500),
    _anh varchar(300),
	_hoten varchar(400),
    _dienthoai varchar(20),
    _email varchar(300),
    _diachi varchar(500)
)
begin
	update khachhang 
    set 
		password = COALESCE(_password, password),
        anh = COALESCE(_anh, anh),
        hovaten = COALESCE(_hoten, hovaten),
        sodienthoai = COALESCE(_dienthoai, sodienthoai),
        email = COALESCE(_email, email),
        diachi = COALESCE(_diachi, diachi)
    where makhachhang = id or email = _email;
end
// DELIMITER ;

-- ==================================== Người dùng ===================================
DELIMITER //
create procedure getusers()
begin
	select * from nguoidung;
end //
DELIMITER ;

DELIMITER //
create procedure getusersbyid(id int)
begin
	select * from nguoidung where MaNguoiDung = id;
end //
DELIMITER ;

DELIMITER //
create procedure creatuser(
	_password varchar(500),
    _ngaysinh date,
    _anh varchar(300),
	_hoten varchar(400),
    _dienthoai varchar(20),
    _email varchar(300),
    _diachi varchar(500),
    _quyen varchar(500),
    _trangthai bit
)
begin
	insert into nguoidung(password,ngaysinh,anh,hoten,dienthoai,email,diachi,quyen,trangthai)
    values(_password,_ngaysinh,_anh,_hoten,_dienthoai,_email,_diachi,_quyen,_trangthai);
end
// DELIMITER ;

DELIMITER //
create procedure deleteuser(
	id int
)
begin
	delete from nguoidung
    where MaNguoiDung = id;
end
// DELIMITER ;

DELIMITER //
create procedure updateuser(
	id int,
    _password varchar(500),
    _ngaysinh date,
    _anh varchar(300),
	_hoten varchar(400),
    _dienthoai varchar(20),
    _email varchar(300),
    _diachi varchar(500),
    _quyen varchar(500),
    _trangthai bit
)
begin
	update nguoidung 
    set password = _password,
		ngaysinh = _ngaysinh,
        anh = _anh,
        hoten = _hoten,
        dienthoai = _dienthoai,
        email = _email,
        diachi = _diachi,
        quyen = _quyen,
        trangthai = _trangthai
    where manguoidung = id;
end
// DELIMITER ;

DELIMITER //
CREATE PROCEDURE SearchUsers(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM nguoidung
    WHERE hoten LIKE CONCAT('%', searchKeyword, '%') or diachi LIKE CONCAT('%', searchKeyword, '%') or dienthoai LIKE CONCAT('%', searchKeyword, '%') or email LIKE CONCAT('%', searchKeyword, '%')
		or NgaySinh LIKE CONCAT('%', searchKeyword, '%');
    
    -- Tìm kiếm và trả về kết quả phân trang
    SELECT *
    FROM nguoidung
    WHERE hoten LIKE CONCAT('%', searchKeyword, '%') or diachi LIKE CONCAT('%', searchKeyword, '%') or dienthoai LIKE CONCAT('%', searchKeyword, '%') or email LIKE CONCAT('%', searchKeyword, '%')
		or NgaySinh LIKE CONCAT('%', searchKeyword, '%')
	LIMIT offsetValue, itemsPerPage;
END //

DELIMITER ;


-- ==================================== Sản Phẩm ===================================
DELIMITER //
create procedure getproducts()
begin
	select * from sanpham;
end //
DELIMITER ;

DELIMITER //
create procedure getproductsbyid(id int)
begin
	select sp.*,ct.GiaBan,ct.GiaKhuyenMai,ct.SoLuongTon,ct.MaMau,ct.MaChiTietSanPham,ct.MaKichThuoc,ms.TenMau,kt.TenKichThuoc,ha.MaAnh,ha.DuongDan,h.TenHang from sanpham sp inner join chitietsanpham ct on ct.MaSanPham = sp.MaSanPham
		inner join hang h on h.MaHang = sp.MaHang
        inner join kichthuoc kt on kt.MaKichThuoc = ct.MaKichThuoc 
        inner join mausac ms on ms.MaMau = ct.MaMau
        left join hinhanh ha on ha.MaMau = ct.MaMau and ha.MaChiTietSanPham = ct.MaChiTietSanPham
        
    where sp.masanpham = id;
end //
DELIMITER 

DELIMITER //
create procedure getproductsbycateid(id int)
begin
	select ct.MaSanPham,
    MAX(ct.GiaBan) AS Gia,
    MAX(ct.SoLuongTon) AS SoLuong,
	MAX(ct.MaChiTietSanPham) AS MaChiTietSanPham,
	MAX(ct.MaMau) AS MaMau,
	MAX(ct.MaKichThuoc) AS MaKichThuoc,
	MAX(ct.GiaKhuyenMai) AS GiaKhuyenMai,
    MAX(ms.TenMau) AS TenMau,
    MAX(a.MaAnh) AS MaAnh,
    MAX(a.DuongDan) AS DuongDan,
    MAX(kt.TenKichThuoc) AS TenKichThuoc,
    MAX(h.TenHang) AS TenHang,
    MAX(h.MaHang) AS MaHang,
    MAX(lsp.Tenloai) AS TenLoai,
    MAX(lsp.MaLoai) AS MaLoai,
    MAX(sp.TenSanPham) AS TenSanPham from chitietsanpham ct 
	inner join sanpham sp on ct.MaSanPham = sp.MaSanPham
    inner join loaisanpham lsp on lsp.MaLoai = sp.MaLoai
	inner join mausac ms on ms.MaMau = ct.MaMau
	inner join kichthuoc kt on kt.MaKichThuoc = ct.MaKichThuoc
	inner join hang h on h.MaHang = sp.MaHang
	left join hinhanh a on a.MaMau = ct.MaMau and a.MaChiTietSanPham = ct.MaChiTietSanPham
    where lsp.MaLoai = id
    GROUP BY ct.MaSanPham;
end //
DELIMITER ;

call getproductsbyid(5);

DELIMITER //
create procedure creatproduct(
	_tensp varchar(400),
    _maloai int,
    _mahang int,
    _luotxem int,
    _trangthai bit,
    _motangan varchar(500),
    _mota text
)
begin
	insert into sanpham(tensanpham,maloai,mahang,luotxem,trangthai,motangan,mota)
    values(_tensp,_maloai,_mahang,_luotxem,_trangthai,_motangan,_mota);
end
// DELIMITER ;

DELIMITER //
create procedure deleteproduct(
	id int
)
begin
	delete from sanpham
    where Masanpham = id;
end
// DELIMITER ;

DELIMITER //
create procedure updateproduct(
	id int,_tensp varchar(400),
    _maloai int,
    _mahang int,
    _luotxem int,
    _trangthai bit,
    _motangan varchar(500),
    _mota text
)
begin
	update sanpham
    set tensanpham = _tensp,
		maloai = _maloai,
        mahang = _mahang,
        luotxem = _luotxem,
        trangthai = _trangthai,
        motangan = _motangan,
        mota = _mota
    where masanpham = id;
end
// DELIMITER ;

--==============================Ảnh==================================
DELIMITER //
create procedure getimgs()
begin
	select * from hinhanh;
end //
DELIMITER ;

DELIMITER //
create procedure getimgsbyid(id int)
begin
	select * from hinhanh where maanh = id;
end //
DELIMITER ;

DELIMITER //
create procedure getimgsbymanyid(
_mamau int,
_mact int
)
begin
	select * from hinhanh where MaMau = _mamau and MaChiTietSanPham = _mact;
end //
DELIMITER ;

DELIMITER //
create procedure createimg(
	_mamau int,
    _machitietsp int,
    _duongdan varchar(500)
)
begin
	insert into hinhanh(MaMau,MaChiTietSanPham,DuongDan)
    values(_mamau,_machitietsp,_duongdan);
end
// DELIMITER ;

DELIMITER //
create procedure deleteimg(
	id int
)
begin
	delete from hinhanh
    where MaAnh = id;
end
// DELIMITER ;

DELIMITER //
create procedure updateimg(
	id int,
    _mamau int,
    _mact int,
    _duongdan varchar(500)
)
begin
	update hinhanh
    set MaMau = _mamau,
		MaChiTietSanPham = _mact,
        Duongdan = _duongdan
    where maanh = id;
end
// DELIMITER ;
--=========================================================
DELIMITER //
CREATE PROCEDURE SearchProducts(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM sanpham inner join loaisanpham on sanpham.maloai = loaisanpham.MaLoai
		inner join hang on hang.MaHang = sanpham.MaHang
    WHERE sanpham.TenSanPham LIKE CONCAT('%', searchKeyword, '%')
		or sanpham.MoTa LIKE CONCAT('%', searchKeyword, '%')
        or sanpham.MoTaNgan LIKE CONCAT('%', searchKeyword, '%')
        or hang.tenhang LIKE CONCAT('%', searchKeyword, '%')
        or loaisanpham.tenloai LIKE CONCAT('%', searchKeyword, '%');
    
    -- Tìm kiếm và trả về kết quả phân trang
    SELECT sanpham.*,loaisanpham.TenLoai,hang.TenHang
   FROM sanpham inner join loaisanpham on sanpham.maloai = loaisanpham.MaLoai
		inner join hang on hang.MaHang = sanpham.MaHang
    WHERE sanpham.TenSanPham LIKE CONCAT('%', searchKeyword, '%')
		or sanpham.MoTa LIKE CONCAT('%', searchKeyword, '%')
        or sanpham.MoTaNgan LIKE CONCAT('%', searchKeyword, '%')
        or hang.tenhang LIKE CONCAT('%', searchKeyword, '%')
        or loaisanpham.tenloai LIKE CONCAT('%', searchKeyword, '%')
	LIMIT offsetValue, itemsPerPage;
END //

DELIMITER ;

-- ==================================== Chi tiết Sản Phẩm ===================================
DELIMITER //
create procedure getdetailproducts()
begin
	select ct.*,ms.TenMau,kt.TenKichThuoc,h.TenHang,sp.TenSanPham from chitietsanpham ct inner join sanpham sp on ct.MaSanPham = sp.MaSanPham
		inner join mausac ms on ms.MaMau = ct.MaMau
        inner join kichthuoc kt on kt.MaKichThuoc = ct.MaKichThuoc
        inner join hang h on h.MaHang = sp.MaHang;
end //
DELIMITER 


DELIMITER //
create procedure getdetailimgproductbydetailproductid(proid int,colorid int)
begin
	select ct.*,
    ms.TenMau,kt.TenKichThuoc,h.TenHang,sp.TenSanPham,
    a.MaAnh AS MaAnh,
    a.DuongDan AS DuongDan
	from chitietsanpham ct 
	inner join sanpham sp on ct.MaSanPham = sp.MaSanPham
	inner join mausac ms on ms.MaMau = ct.MaMau
	inner join kichthuoc kt on kt.MaKichThuoc = ct.MaKichThuoc
	inner join hang h on h.MaHang = sp.MaHang
	left join hinhanh a on a.MaMau = ct.MaMau and a.MaChiTietSanPham = ct.MaChiTietSanPham
    where ct.MaSanPham = proid and a.MaMau = colorid;
end //
DELIMITER 

DELIMITER //
create procedure getdatabyproductid(id int)
begin
WITH RankedCTE AS (
    SELECT 
        ct.*,
        ms.TenMau,
        kt.TenKichThuoc,
        h.TenHang,
        sp.TenSanPham,
        sp.MoTaNgan,
        sp.MoTa,
        sp.MaLoai,
        sp.TrangThai,
        sp.LuotXem,
        a.MaAnh AS MaAnh,
        a.DuongDan AS DuongDan,
        ROW_NUMBER() OVER (PARTITION BY ct.MaSanPham, ct.MaKichThuoc ORDER BY ct.MaKichThuoc) AS RowNum
    FROM chitietsanpham ct 
    INNER JOIN sanpham sp ON ct.MaSanPham = sp.MaSanPham
    INNER JOIN mausac ms ON ms.MaMau = ct.MaMau
    INNER JOIN kichthuoc kt ON kt.MaKichThuoc = ct.MaKichThuoc
    INNER JOIN hang h ON h.MaHang = sp.MaHang
    LEFT JOIN hinhanh a ON a.MaMau = ct.MaMau AND a.MaChiTietSanPham = ct.MaChiTietSanPham
    WHERE ct.MaSanPham = id
)
SELECT 
    MaChiTietSanPham,
    MaSanPham,
    MoTa,
    MoTaNgan,
    LuotXem,
    TrangThai,
    MaLoai,
    GiaBan,
    SoLuongTon,
    MaMau,
    MaKichThuoc,
    GiaKhuyenMai,
    TenMau,
    TenKichThuoc,
    TenHang,
    TenSanPham,
    MaAnh,
    DuongDan
FROM RankedCTE
WHERE RowNum = 1;
end //
DELIMITER ;  
call getdatabyproductid(4);

DELIMITER //
create procedure getalldatadetailproduct()
begin 
	WITH RankedCTE AS (
    SELECT
        ct.MaSanPham,
        ct.GiaBan AS Gia,
        ct.SoLuongTon AS SoLuong,
        ct.MaChiTietSanPham,
        ct.MaMau,
        ct.MaKichThuoc,
        ct.GiaKhuyenMai,
        ms.TenMau,
        a.MaAnh,
        a.DuongDan,
        kt.TenKichThuoc,
        h.TenHang,
        sp.TenSanPham,
        ROW_NUMBER() OVER (PARTITION BY ct.MaSanPham ORDER BY ct.MaMau) AS RowNum
    FROM
        chitietsanpham ct
    INNER JOIN sanpham sp ON ct.MaSanPham = sp.MaSanPham
    INNER JOIN mausac ms ON ms.MaMau = ct.MaMau
    INNER JOIN kichthuoc kt ON kt.MaKichThuoc = ct.MaKichThuoc
    INNER JOIN hang h ON h.MaHang = sp.MaHang
    LEFT JOIN hinhanh a ON a.MaMau = ct.MaMau AND a.MaChiTietSanPham = ct.MaChiTietSanPham
)SELECT
        MaSanPham,
        Gia,
        SoLuong,
        MaChiTietSanPham,
        MaMau,
        MaKichThuoc,
        GiaKhuyenMai,
        TenMau,
        MaAnh,
        DuongDan,
        TenKichThuoc,
        TenHang,
        TenSanPham
    FROM
        RankedCTE
    WHERE
        RowNum = 1; -- Lấy thông tin theo màu đầu tiên
END //
DELIMITER ;

call getalldatadetailproduct();

DELIMITER //
create procedure getdetailproductsbyid(id int)
begin
	select * from chitietsanpham where MaChiTietSanPham = id;
end //
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getdatasizebyproductid`(proid int,colorid int)
begin
	SELECT 
    ct.MaSanPham,
    MAX(ct.GiaBan) AS Gia,
    MAX(ct.SoLuongTon) AS SoLuong,
    MAX(ct.MaChiTietSanPham) AS MaChiTietSanPham,
    MIN(ct.MaMau) AS MaMau,
    MIN(ct.MaKichThuoc) AS MaKichThuoc,
    MAX(ct.GiaKhuyenMai) AS GiaKhuyenMai,
    MAX(ms.TenMau) AS TenMau,
    MAX(a.MaAnh) AS MaAnh,
    MAX(a.DuongDan) AS DuongDan,
    MAX(kt.TenKichThuoc) AS TenKichThuoc,
    MAX(h.TenHang) AS TenHang,
    MAX(sp.TenSanPham) AS TenSanPham
	FROM chitietsanpham ct
	INNER JOIN sanpham sp ON ct.MaSanPham = sp.MaSanPham
	INNER JOIN mausac ms ON ms.MaMau = ct.MaMau
	INNER JOIN kichthuoc kt ON kt.MaKichThuoc = ct.MaKichThuoc
	INNER JOIN hang h ON h.MaHang = sp.MaHang
	LEFT JOIN hinhanh a ON a.MaMau = ct.MaMau AND a.MaChiTietSanPham = ct.MaChiTietSanPham
	WHERE ct.MaSanPham = proid and ct.MaMau = colorid
	GROUP BY ct.MaKichThuoc,ct.MaSanPham,ct.MaMau;
end //
DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getdatacolorbyproductid`(proid INT)
BEGIN
    WITH RankedCTE AS (
        SELECT 
            ct.MaSanPham,
            ct.GiaBan AS Gia,
            ct.SoLuongTon AS SoLuong,
            ct.MaChiTietSanPham,
            ct.MaMau,
            ct.MaKichThuoc,
            ct.GiaKhuyenMai,
            ms.TenMau,
            a.MaAnh,
            a.DuongDan,
            kt.TenKichThuoc,
            h.TenHang,
            sp.TenSanPham,
            ROW_NUMBER() OVER (PARTITION BY ct.MaSanPham, ct.MaMau ORDER BY ct.MaMau) AS RowNum
        FROM chitietsanpham ct
        INNER JOIN sanpham sp ON ct.MaSanPham = sp.MaSanPham
        INNER JOIN mausac ms ON ms.MaMau = ct.MaMau
        INNER JOIN kichthuoc kt ON kt.MaKichThuoc = ct.MaKichThuoc
        INNER JOIN hang h ON h.MaHang = sp.MaHang
        LEFT JOIN hinhanh a ON a.MaMau = ct.MaMau AND a.MaChiTietSanPham = ct.MaChiTietSanPham
        WHERE ct.MaSanPham = proid
    )
    
    SELECT 
        MaSanPham,
        Gia,
        SoLuong,
        MaChiTietSanPham,
        MaMau,
        MaKichThuoc,
        GiaKhuyenMai,
        TenMau,
        MaAnh,
        DuongDan,
        TenKichThuoc,
        TenHang,
        TenSanPham
    FROM RankedCTE
    WHERE RowNum = 1;
END // DELIMITER ;

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `getquantyofsizeid`(proid int,colorid int,sizeid int)
begin
	SELECT 
    ct.*,
    sp.MoTa,sp.MaLoai,sp.TrangThai,sp.TenSanPham,sp.MoTa,sp.MoTaNgan,sp.MaHang,
    ms.TenMau,
    kt.TenKichThuoc,
    kt.MaKichThuoc,
    ha.MaAnh,
    ha.DuongDan
	FROM chitietsanpham ct
	INNER JOIN kichthuoc kt ON kt.MaKichThuoc = ct.MaKichThuoc
		inner join sanpham sp on sp.MaSanPham = ct.MaSanPham
        inner join hang h on h.MaHang = sp.MaHang
        inner join mausac ms on ms.MaMau = ct.MaMau
        inner join hinhanh ha on ha.MaChiTietSanPham = ct.MaChiTietSanPham and ha.MaMau = ct.MaMau
	WHERE ct.MaSanPham = proid and ct.MaMau = colorid and ct.MaKichThuoc = sizeid;
end //
DELIMITER ;

call getquantyofsizeid(4,5,3);

DELIMITER //
create procedure getdetailproductsid(id int)
begin
	select ct.*,sp.TenSanPham,ms.TenMau,kt.TenKichThuoc,(SELECT duongdan FROM hinhanh h WHERE h.MaChiTietSanPham = ct.MaChiTietSanPham and h.mamau = ct.MaMau LIMIT 1) AS duongdan 
    from chitietsanpham ct inner join mausac ms on ct.MaMau = ms.MaMau
    left join kichthuoc kt on ct.MaKichThuoc = kt.MaKichThuoc 
    left join sanpham sp on ct.MaSanPham = sp.MaSanPham
    where ct.MaSanPham = id;
end //
DELIMITER ;

call getdetailproductsid(4);

DELIMITER //
create procedure creatdetailproduct(
	_masp int,
    _mamau int,
    _makichthuoc int,
    _giaban float,
    _giakhuyenmai float
)
begin
	insert into chitietsanpham(masanpham,mamau,makichthuoc,giaban,giakhuyenmai,soluongton)
    values(_masp,_mamau,_makichthuoc,_giaban,_giakhuyenmai,0);
end
// DELIMITER ;

DELIMITER //
create procedure deletdetailproduct(
	id int
)
begin
	delete from chitietsanpham
    where MaChiTietSanPham = id;
end
// DELIMITER ;

DELIMITER //
create procedure updatedetailproduct(
	id int,
    _mamau int,
    _makichthuoc int,
    _giaban float,
    _giakm float
)
begin
	update chitietsanpham
    set mamau = _mamau,
        makichthuoc = _makichthuoc,
        giaban = _giaban,
        giakhuyenmai = _giakm
    where machitietsanpham = id;
end
// DELIMITER ;

DELIMITER //
create procedure updateQuantityProduct(
	id int,
    _sl float
)
begin
	update chitietsanpham
    set soluongton = soluongton - _sl
    where machitietsanpham = id;
end
// DELIMITER ;


-- ==================================== Hóa đơn nhập ===================================
DELIMITER //
create procedure getimportinvoice()
begin
	select * from hoadonnhap;
end //
DELIMITER ;

DELIMITER //
create procedure getimportinvoicesbyid(id int)
begin
	select * from hoadonnhap where MaHoaDonNhap = id;
end //
DELIMITER ;

DELIMITER //
create procedure creatimportinvoice(
	_mancc int,
    _manguoidung int,
    _ngaynhap date
)
begin
	insert into hoadonnhap(manhacungcap,manguoidung,ngaynhap)
    values(_mancc,_manguoidung,_ngaynhap);
end
// DELIMITER ;

DELIMITER //
create procedure deleteimportinvoice(
	id int
)
begin
	delete from hoadonnhap
    where mahoadonnhap = id;
end
// DELIMITER ;

DELIMITER //
create procedure updateimportinvoice(
	id int,
    _mancc int,
    _manguoidung int,
    _ngaynhap date
)
begin
	update hoadonnhap
    set manhacungcap = _mancc,
		manguoidung = _manguoidung,
        ngaynhap = _ngaynhap
    where mahoadonnhap = id;
end
// DELIMITER ;

DELIMITER //
CREATE PROCEDURE SearchImportinvoices(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM hoadonnhap inner join nhacungcap on hoadonnhap.MaNhaCungCap = nhacungcap.MaNhaCungCap
		inner join nguoidung on hoadonnhap.MaNguoiDung = nguoidung.MaNguoiDung
    WHERE hoadonnhap.NgayNhap LIKE CONCAT('%', searchKeyword, '%')
		or nguoidung.HoTen LIKE CONCAT('%', searchKeyword, '%')
        or nhacungcap.HoTen LIKE CONCAT('%', searchKeyword, '%');
    
    -- Tìm kiếm và trả về kết quả phân trang
    SELECT *,nguoidung.HoTen as tennguoidung,nhacungcap.hoten as tennhacungcap,nguoidung.MaNguoiDung,nhacungcap.MaNhaCungCap
    FROM hoadonnhap inner join nhacungcap on hoadonnhap.MaNhaCungCap = nhacungcap.MaNhaCungCap
		inner join nguoidung on hoadonnhap.MaNguoiDung = nguoidung.MaNguoiDung
    WHERE hoadonnhap.NgayNhap LIKE CONCAT('%', searchKeyword, '%')
		or nguoidung.HoTen LIKE CONCAT('%', searchKeyword, '%')
        or nhacungcap.HoTen LIKE CONCAT('%', searchKeyword, '%')
	LIMIT offsetValue, itemsPerPage;
END //

DELIMITER ;

-- ==================================== Chi tiết hóa đơn nhập ===================================
DELIMITER //
create procedure getdetailimportinvoice()
begin
	select * from chitiethoadonnhap;
end //
DELIMITER ;

DELIMITER //
create procedure getdetailimportinvoicebyid(id int)
begin
	select ct.*,sp.TenSanPham,sp.MaSanPham,ms.TenMau,ms.MaMau,kt.MaKichThuoc,kt.TenKichThuoc from chitiethoadonnhap ct inner join chitietsanpham ctsp on ct.MaChiTietSanPham = ctsp.MaChiTietSanPham
		inner join sanpham sp on sp.MaSanPham = ctsp.MaSanPham
        inner join kichthuoc kt on kt.MaKichThuoc = ctsp.MaKichThuoc
        inner join mausac ms on ms.MaMau = ctsp.MaMau
    where ct.MaChiTietHoadonNhap = id;
end //
DELIMITER ;

call getdetailimportinvoicebyid(1);

DELIMITER //
create procedure getdetailimportinvoicesbyid(id int)
begin
	select ct.*,sp.TenSanPham,sp.MaSanPham,ms.TenMau,ms.MaMau,kt.MaKichThuoc,kt.TenKichThuoc from chitiethoadonnhap ct inner join chitietsanpham ctsp on ct.MaChiTietSanPham = ctsp.MaChiTietSanPham
		inner join sanpham sp on sp.MaSanPham = ctsp.MaSanPham
        inner join kichthuoc kt on kt.MaKichThuoc = ctsp.MaKichThuoc
        inner join mausac ms on ms.MaMau = ctsp.MaMau
    where MaHoaDonNhap = id;
end //
DELIMITER ;

DELIMITER //
create procedure creatdetailimportinvoice(
	_mahdn int,
    _mactsp int,
    _sl int,
    _gianhap float
)
begin
	insert into chitiethoadonnhap(mahoadonnhap,machitietsanpham,soluong,gianhap)
    values(_mahdn,_mactsp,_sl,_gianhap);
end
// DELIMITER ;
DELIMITER //
CREATE TRIGGER trg_after_insert_ChiTietHoaDonNhap
AFTER INSERT ON ChiTietHoaDonNhap FOR EACH ROW
BEGIN
    DECLARE SoLuongNhap INT;
    
    -- Lấy số lượng từ bảng ChiTietHoaDonNhap
    SELECT NEW.SoLuong INTO SoLuongNhap
    FROM ChiTietHoaDonNhap
    WHERE MaChiTietHoaDonNhap = NEW.MaChiTietHoaDonNhap;
    
    -- Cập nhật số lượng trong bảng ChiTietSanPham
    UPDATE chitietsanpham
    SET SoLuongTon = SoLuongTon + SoLuongNhap
    WHERE MaChiTietSanPham = NEW.MaChiTietSanPham;
END;
//
DELIMITER ;
DELIMITER //
-- Trigger cho UPDATE trên ChiTietHoaDonNhap
CREATE TRIGGER trg_after_update_ChiTietHoaDonNhap
AFTER UPDATE ON ChiTietHoaDonNhap FOR EACH ROW
BEGIN
    DECLARE SoLuongNhap INT;
    
    -- Lấy số lượng từ bảng ChiTietHoaDonNhap
    SELECT NEW.SoLuong INTO SoLuongNhap
    FROM ChiTietHoaDonNhap
    WHERE MaChiTietHoaDonNhap = NEW.MaChiTietHoaDonNhap;
    
    -- Cập nhật số lượng trong bảng ChiTietSanPham
    UPDATE chitietsanpham
    SET SoLuongTon = SoLuongTon + SoLuongNhap
    WHERE MaChiTietSanPham = NEW.MaChiTietSanPham;
END;
//
DELIMITER ;

DELIMITER //
create procedure deletedetailimportinvoice(
	id int
)
begin
	delete from chitiethoadonnhap
    where MaChiTietHoadonNhap = id;
end
// DELIMITER ;

DELIMITER //
create procedure updatedetailimportinvoice(
	id int,
	_mahdn int,
    _mactsp int,
    _sl int,
    _gianhap float
)
begin
	update chitiethoadonnhap
    set mahoadonnhap = _mahdn,
		machitietsanpham = _mactsp,
        soluong = _sl,
        gianhap = _gianhap
    where machitiethoadonnhap = id;
end
// DELIMITER ;

-- ============================================= Hóa đơn bán =============================================
DELIMITER //
create procedure getbillofsale()
begin
	select * from hoadonban;
end //
DELIMITER ;

DELIMITER //
create procedure getbillofsalebycustomerid(id int)
begin
	select * from hoadonban
    where MaKhachHang = id;
end //
DELIMITER ;

call getbillofsale();

DELIMITER //
create procedure getbestsellingproduct()
begin 
	SELECT 
    ct.MaChiTietSanPham,
    sp.MaSanPham,
    ms.MaMau,
    ms.TenMau, 
    kt.MaKichThuoc,
    kt.TenKichThuoc, 
    MAX(ha.DuongDan) AS DuongDan,
    ct.giaban,
    ct.GiaKhuyenMai,
    ct.SoLuongTon,
    sp.TenSanPham,
    SUM(cthd.SoLuong) AS TongSoLuong
FROM 
    chitietsanpham ct 
INNER JOIN 
    sanpham sp ON sp.MaSanPham = ct.MaSanPham
INNER JOIN 
    mausac ms ON ct.MaMau = ms.MaMau 
INNER JOIN 
    kichthuoc kt ON kt.MaKichThuoc = ct.MaKichThuoc
INNER JOIN 
    chitiethoadonban cthd ON ct.MaChiTietSanPham = cthd.MaChiTietSanPham
LEFT JOIN 
    (SELECT MaChiTietSanPham, MaMau, MAX(DuongDan) AS DuongDan
     FROM hinhanh
     GROUP BY MaChiTietSanPham, MaMau) ha 
ON  ct.MaChiTietSanPham = ha.MaChiTietSanPham AND ct.MaMau = ha.MaMau
GROUP BY 
    ct.MaChiTietSanPham, ms.TenMau, kt.TenKichThuoc, ha.DuongDan, ct.giaban, ct.GiaKhuyenMai, ct.SoLuongTon, sp.TenSanPham
ORDER BY 
    TongSoLuong DESC;
end
//
DELIMITER ;

call getbestsellingproduct;

DELIMITER //
create procedure getbillofsalenew()
begin
	select * from hoadonban
    ORDER BY MaHoaDon DESC 
    LIMIT 1;
end //
DELIMITER ;

call getbillofsalenew;

DELIMITER //
create procedure getbillofsalebyid(id int)
begin
	SELECT hd.*,kh.MaKhachHang,kh.HoVaTen,gg.MaPhieu,gg.TenPhieu,vc.MaVanChuyen,vc.TenVanChuyen
    FROM hoadonban hd inner join khachhang kh on hd.MaKhachHang = kh.MaKhachHang
		inner join phieugiamgia gg  on gg.MaPhieu = hd.MaPhieu
        inner join vanchuyen vc on vc.MaVanChuyen = hd.MaVanChuyen
	where hd.MaHoaDon = id;
end //
DELIMITER ;

DELIMITER //
create procedure creatbillofsale(
	_makh int,
    _ngaytao date,
    _diachinhan varchar(2000),
    _mavanchuyen int,
    _maphieu int,
    _trangthai int,
    _hinhthucthanhtoan varchar(1000),
    _tongtien float,
    _dienthoai varchar(10),
    _nguoinhan varchar(300)
)
begin
	insert into hoadonban(makhachhang,ngaytao,diachinhan,trangthai,MaVanChuyen,MaPhieu,HinhThucThanhToan,TongTien,DienThoaiNhan,NguoiNhan)
    values(_makh,_ngaytao,_diachinhan,_trangthai,_mavanchuyen,_maphieu,_hinhthucthanhtoan,_tongtien,_dienthoai,_nguoinhan);
end
// DELIMITER ;

DELIMITER //
create procedure deletebillofsale(
	id int
)
begin
	delete from hoadonban
    where mahoadon = id;
end
// DELIMITER ;
DELIMITER //
create procedure updatestatusbillofsale(
	id int,
    _trangthai int
)
begin
	update hoadonban
    set trangthai = _trangthai
    where mahoadon = id;
end
// DELIMITER ;

DELIMITER //
create procedure updatebillofsalehoadonban(
	id int,
    _makh int,
    _ngaytao date,
    _diachinhan varchar(2000),
    _mavanchuyen int,
    _maphieu int,
    _trangthai int,
    _hinhthucthanhtoan varchar(1000),
    _tongtien float
)
begin
	update hoadonban
    set makhachhang = _makh,
		ngaytao = _ngaytao,
        diachinhan = _diachinhan,
        trangthai = _trangthai,
        MaVanChuyen = _mavanchuyen,
        MaPhieu = _maphieu,
        HinhThucThanhToan = _hinhthucthanhtoan,
        TongTien = _tongtien
    where mahoadon = id;
end
// DELIMITER ;

DELIMITER //
CREATE PROCEDURE SearchBillofsale(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT,
    IN status INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM hoadonban hd inner join khachhang kh on hd.MaKhachHang = kh.MaKhachHang
		left join phieugiamgia gg  on gg.MaPhieu = hd.MaPhieu
        left join vanchuyen vc on vc.MaVanChuyen = hd.MaVanChuyen
    WHERE hd.TrangThai = status and (
		hd.NgayTao LIKE CONCAT('%', searchKeyword, '%')
		or hd.DiaChiNhan LIKE CONCAT('%', searchKeyword, '%')
        or kh.HoVaTen LIKE CONCAT('%', searchKeyword, '%')
        or hd.TongTien LIKE CONCAT('%', searchKeyword, '%')
        or hd.HinhThucThanhToan LIKE CONCAT('%', searchKeyword, '%')
        or vc.TenVanChuyen LIKE CONCAT('%', searchKeyword, '%')
        or gg.TenPhieu LIKE CONCAT('%', searchKeyword, '%'));
    
    -- Tìm kiếm và trả về kết quả phân trang
    SELECT hd.*,kh.MaKhachHang,kh.HoVaTen,gg.MaPhieu,gg.TenPhieu,vc.MaVanChuyen,vc.TenVanChuyen
    FROM hoadonban hd inner join khachhang kh on hd.MaKhachHang = kh.MaKhachHang
		left join phieugiamgia gg  on gg.MaPhieu = hd.MaPhieu
        left join vanchuyen vc on vc.MaVanChuyen = hd.MaVanChuyen
    WHERE hd.TrangThai = status and (
		hd.NgayTao LIKE CONCAT('%', searchKeyword, '%')
		or hd.DiaChiNhan LIKE CONCAT('%', searchKeyword, '%')
        or kh.HoVaTen LIKE CONCAT('%', searchKeyword, '%')
        or hd.TongTien LIKE CONCAT('%', searchKeyword, '%')
        or hd.HinhThucThanhToan LIKE CONCAT('%', searchKeyword, '%')
        or vc.TenVanChuyen LIKE CONCAT('%', searchKeyword, '%')
        or gg.TenPhieu LIKE CONCAT('%', searchKeyword, '%'))
	LIMIT offsetValue, itemsPerPage;
END //

DELIMITER ;

DELIMITER //
CREATE PROCEDURE SearchBillofsaleconfirmed(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM hoadonban hd inner join khachhang kh on hd.MaKhachHang = kh.MaKhachHang
		inner join phieugiamgia gg  on gg.MaPhieu = hd.MaPhieu
        inner join vanchuyen vc on vc.MaVanChuyen = hd.MaVanChuyen
    WHERE hd.TrangThai = 1 and (
		hd.NgayTao LIKE CONCAT('%', searchKeyword, '%')
		or hd.DiaChiNhan LIKE CONCAT('%', searchKeyword, '%')
        or kh.HoVaTen LIKE CONCAT('%', searchKeyword, '%')
        or hd.TongTien LIKE CONCAT('%', searchKeyword, '%')
        or hd.HinhThucThanhToan LIKE CONCAT('%', searchKeyword, '%')
        or vc.TenVanChuyen LIKE CONCAT('%', searchKeyword, '%')
        or gg.TenPhieu LIKE CONCAT('%', searchKeyword, '%'));
    
    -- Tìm kiếm và trả về kết quả phân trang
    SELECT hd.*,kh.MaKhachHang,kh.HoVaTen,gg.MaPhieu,gg.TenPhieu,vc.MaVanChuyen,vc.TenVanChuyen
    FROM hoadonban hd inner join khachhang kh on hd.MaKhachHang = kh.MaKhachHang
		inner join phieugiamgia gg  on gg.MaPhieu = hd.MaPhieu
        inner join vanchuyen vc on vc.MaVanChuyen = hd.MaVanChuyen
    WHERE hd.TrangThai = 1 and (
		hd.NgayTao LIKE CONCAT('%', searchKeyword, '%')
		or hd.DiaChiNhan LIKE CONCAT('%', searchKeyword, '%')
        or kh.HoVaTen LIKE CONCAT('%', searchKeyword, '%')
        or hd.TongTien LIKE CONCAT('%', searchKeyword, '%')
        or hd.HinhThucThanhToan LIKE CONCAT('%', searchKeyword, '%')
        or vc.TenVanChuyen LIKE CONCAT('%', searchKeyword, '%')
        or gg.TenPhieu LIKE CONCAT('%', searchKeyword, '%'))
	LIMIT offsetValue, itemsPerPage;
END //

DELIMITER ;

DELIMITER //
CREATE PROCEDURE SearchBillofsaledilivered(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM hoadonban hd inner join khachhang kh on hd.MaKhachHang = kh.MaKhachHang
		inner join phieugiamgia gg  on gg.MaPhieu = hd.MaPhieu
        inner join vanchuyen vc on vc.MaVanChuyen = hd.MaVanChuyen
    WHERE hd.TrangThai = 1 and (
		hd.NgayTao LIKE CONCAT('%', searchKeyword, '%')
		or hd.DiaChiNhan LIKE CONCAT('%', searchKeyword, '%')
        or kh.HoVaTen LIKE CONCAT('%', searchKeyword, '%')
        or hd.TongTien LIKE CONCAT('%', searchKeyword, '%')
        or hd.HinhThucThanhToan LIKE CONCAT('%', searchKeyword, '%')
        or vc.TenVanChuyen LIKE CONCAT('%', searchKeyword, '%')
        or gg.TenPhieu LIKE CONCAT('%', searchKeyword, '%'));
    
    -- Tìm kiếm và trả về kết quả phân trang
    SELECT hd.*,kh.MaKhachHang,kh.HoVaTen,gg.MaPhieu,gg.TenPhieu,vc.MaVanChuyen,vc.TenVanChuyen
    FROM hoadonban hd inner join khachhang kh on hd.MaKhachHang = kh.MaKhachHang
		inner join phieugiamgia gg  on gg.MaPhieu = hd.MaPhieu
        inner join vanchuyen vc on vc.MaVanChuyen = hd.MaVanChuyen
    WHERE hd.TrangThai = 1 and (
		hd.NgayTao LIKE CONCAT('%', searchKeyword, '%')
		or hd.DiaChiNhan LIKE CONCAT('%', searchKeyword, '%')
        or kh.HoVaTen LIKE CONCAT('%', searchKeyword, '%')
        or hd.TongTien LIKE CONCAT('%', searchKeyword, '%')
        or hd.HinhThucThanhToan LIKE CONCAT('%', searchKeyword, '%')
        or vc.TenVanChuyen LIKE CONCAT('%', searchKeyword, '%')
        or gg.TenPhieu LIKE CONCAT('%', searchKeyword, '%'))
	LIMIT offsetValue, itemsPerPage;
END //

DELIMITER ;
-- ============================================= chi tiết hóa đơn bán =============================================
DELIMITER //
create procedure getdetailbillofsale()
begin
	select cthd.*,ctsp.GiaBan,ctsp.MaMau,ctsp.MaKichThuoc,ctsp.MaChiTietSanPham,kt.TenKichThuoc,ms.TenMau,hd.MaHoaDon,sp.TenSanPham,sp.MaSanPham 
    from chitiethoadonban cthd inner join chitietsanpham ctsp 
		on cthd.MaChiTietSanPham = ctsp.MaChiTietSanPham
		inner join hoadonban hd on hd.MaHoaDon = cthd.MaHoaDon
        inner join sanpham sp on sp.MaSanPham = ctsp.MaSanPham
        inner join kichthuoc kt on kt.MaKichThuoc = ctsp.MaKichThuoc
        inner join mausac ms on ms.MaMau = ctsp.MaMau;
end //
DELIMITER ;

DELIMITER //
create procedure getinfoproductofdetailbillofsale(id int)
begin
	WITH RankedCTE AS (
    SELECT 
        cthd.GiaBan AS GiaBanCTHD,
        cthd.SoLuong,
        ctsp.GiaBan AS GiaBanCTSP,
        ctsp.GiaKhuyenMai,
        ctsp.MaMau,
        ctsp.MaKichThuoc,
        ctsp.MaChiTietSanPham,
        kt.TenKichThuoc,
        ms.TenMau,
        hd.MaHoaDon,
        sp.TenSanPham,
        ctsp.MaSanPham,
        hd.NgayTao,
        hd.DiaChiNhan,
        hd.HinhThucThanhToan,
        hd.TongTien,
        hd.TrangThai,
        hd.DienThoaiNhan,
        hd.NguoiNhan,
        hd.MaVanChuyen,
        vc.TenVanChuyen,
        hd.MaPhieu,
        psg.TenPhieu,
        kh.HoVaTen,
        vc.Gia,
        lpsg.GiaTri,
        lpsg.LoaiPhieu,
        ha.DuongDan,
        ROW_NUMBER() OVER (PARTITION BY ctsp.MaChiTietSanPham, ctsp.MaMau ORDER BY ctsp.MaMau) AS RowNum
    FROM 
        chitiethoadonban cthd
    INNER JOIN chitietsanpham ctsp ON cthd.MaChiTietSanPham = ctsp.MaChiTietSanPham
    INNER JOIN hoadonban hd ON hd.MaHoaDon = cthd.MaHoaDon
    INNER JOIN sanpham sp ON sp.MaSanPham = ctsp.MaSanPham
    INNER JOIN kichthuoc kt ON kt.MaKichThuoc = ctsp.MaKichThuoc
    INNER JOIN mausac ms ON ms.MaMau = ctsp.MaMau
    LEFT JOIN hinhanh ha ON ha.MaChiTietSanPham = ctsp.MaChiTietSanPham AND ha.MaMau = ctsp.MaMau
    LEFT JOIN phieugiamgia psg ON psg.MaPhieu = hd.MaPhieu
    LEFT JOIN loaiphieugiamgia lpsg ON lpsg.MaLoaiPhieu = psg.MaLoaiPhieu
    LEFT JOIN vanchuyen vc ON vc.MaVanChuyen = hd.MaVanChuyen
    LEFT JOIN khachhang kh ON kh.MaKhachHang = hd.MaKhachHang
    WHERE 
        cthd.MaHoaDon = id
)
    
SELECT 
    GiaBanCTHD,
    SoLuong,
    GiaBanCTSP,
    GiaKhuyenMai,
    MaMau,
    MaKichThuoc,
    MaChiTietSanPham,
    TenKichThuoc,
    TenMau,
    MaHoaDon,
    TenSanPham,
    MaSanPham,
    NgayTao,
    DiaChiNhan,
    HinhThucThanhToan,
    TongTien,
    TrangThai,
    DienThoaiNhan,
    NguoiNhan,
    MaVanChuyen,
    TenVanChuyen,
    MaPhieu,
    TenPhieu,
    HoVaTen,
    Gia,
    GiaTri,
    LoaiPhieu,
    DuongDan
FROM 
    RankedCTE
WHERE 
    RowNum = 1;
end //
DELIMITER ;

DELIMITER //
create procedure getdetailbillofsalebycustomerid(id int)
begin
	WITH RankedCTE AS (
    SELECT 
        cthd.GiaBan AS GiaBanCTHD,
        cthd.SoLuong,
        ctsp.GiaBan AS GiaBanCTSP,
        ctsp.GiaKhuyenMai,
        ctsp.MaMau,
        ctsp.MaKichThuoc,
        ctsp.MaChiTietSanPham,
        kt.TenKichThuoc,
        ms.TenMau,
        hd.MaHoaDon,
        sp.TenSanPham,
        ctsp.MaSanPham,
        hd.NgayTao,
        hd.DiaChiNhan,
        hd.HinhThucThanhToan,
        hd.TongTien,
        hd.TrangThai,
        hd.DienThoaiNhan,
        hd.NguoiNhan,
        hd.MaVanChuyen,
        vc.TenVanChuyen,
        hd.MaPhieu,
        psg.TenPhieu,
        kh.HoVaTen,
        vc.Gia,
        lpsg.GiaTri,
        lpsg.LoaiPhieu,
        ha.DuongDan,
        ROW_NUMBER() OVER (PARTITION BY ctsp.MaChiTietSanPham, ctsp.MaMau ORDER BY ctsp.MaMau) AS RowNum
    FROM 
        chitiethoadonban cthd
    INNER JOIN chitietsanpham ctsp ON cthd.MaChiTietSanPham = ctsp.MaChiTietSanPham
    INNER JOIN hoadonban hd ON hd.MaHoaDon = cthd.MaHoaDon
    INNER JOIN sanpham sp ON sp.MaSanPham = ctsp.MaSanPham
    INNER JOIN kichthuoc kt ON kt.MaKichThuoc = ctsp.MaKichThuoc
    INNER JOIN mausac ms ON ms.MaMau = ctsp.MaMau
    LEFT JOIN hinhanh ha ON ha.MaChiTietSanPham = ctsp.MaChiTietSanPham AND ha.MaMau = ctsp.MaMau
    LEFT JOIN phieugiamgia psg ON psg.MaPhieu = hd.MaPhieu
    LEFT JOIN loaiphieugiamgia lpsg ON lpsg.MaLoaiPhieu = psg.MaLoaiPhieu
    LEFT JOIN vanchuyen vc ON vc.MaVanChuyen = hd.MaVanChuyen
    LEFT JOIN khachhang kh ON kh.MaKhachHang = hd.MaKhachHang
    WHERE 
        hd.MaKhachHang = id
)
    
SELECT 
    GiaBanCTHD,
    SoLuong,
    GiaBanCTSP,
    GiaKhuyenMai,
    MaMau,
    MaKichThuoc,
    MaChiTietSanPham,
    TenKichThuoc,
    TenMau,
    MaHoaDon,
    TenSanPham,
    MaSanPham,
    NgayTao,
    DiaChiNhan,
    HinhThucThanhToan,
    TongTien,
    TrangThai,
    DienThoaiNhan,
    NguoiNhan,
    MaVanChuyen,
    TenVanChuyen,
    MaPhieu,
    TenPhieu,
    HoVaTen,
    Gia,
    GiaTri,
    LoaiPhieu,
    DuongDan
FROM 
    RankedCTE
WHERE 
    RowNum = 1;
end //
DELIMITER ;

WITH RankedCTE AS (
    SELECT 
        cthd.GiaBan AS GiaBanCTHD,
        cthd.SoLuong,
        ctsp.GiaBan AS GiaBanCTSP,
        ctsp.GiaKhuyenMai,
        ctsp.MaMau,
        ctsp.MaKichThuoc,
        ctsp.MaChiTietSanPham,
        kt.TenKichThuoc,
        ms.TenMau,
        hd.MaHoaDon,
        sp.TenSanPham,
        ctsp.MaSanPham,
        hd.NgayTao,
        hd.DiaChiNhan,
        hd.HinhThucThanhToan,
        hd.TongTien,
        hd.TrangThai,
        hd.DienThoaiNhan,
        hd.NguoiNhan,
        hd.MaVanChuyen,
        vc.TenVanChuyen,
        hd.MaPhieu,
        psg.TenPhieu,
        kh.HoVaTen,
        vc.Gia,
        lpsg.GiaTri,
        lpsg.LoaiPhieu,
        ha.DuongDan,
        ROW_NUMBER() OVER (PARTITION BY ctsp.MaChiTietSanPham, ctsp.MaMau ORDER BY ctsp.MaMau) AS RowNum
    FROM 
        chitiethoadonban cthd
    INNER JOIN chitietsanpham ctsp ON cthd.MaChiTietSanPham = ctsp.MaChiTietSanPham
    INNER JOIN hoadonban hd ON hd.MaHoaDon = cthd.MaHoaDon
    INNER JOIN sanpham sp ON sp.MaSanPham = ctsp.MaSanPham
    INNER JOIN kichthuoc kt ON kt.MaKichThuoc = ctsp.MaKichThuoc
    INNER JOIN mausac ms ON ms.MaMau = ctsp.MaMau
    LEFT JOIN hinhanh ha ON ha.MaChiTietSanPham = ctsp.MaChiTietSanPham AND ha.MaMau = ctsp.MaMau
    LEFT JOIN phieugiamgia psg ON psg.MaPhieu = hd.MaPhieu
    LEFT JOIN loaiphieugiamgia lpsg ON lpsg.MaLoaiPhieu = psg.MaLoaiPhieu
    LEFT JOIN vanchuyen vc ON vc.MaVanChuyen = hd.MaVanChuyen
    LEFT JOIN khachhang kh ON kh.MaKhachHang = hd.MaKhachHang
    WHERE 
        cthd.MaHoaDon = 37
)
    
SELECT 
    GiaBanCTHD,
    SoLuong,
    GiaBanCTSP,
    GiaKhuyenMai,
    MaMau,
    MaKichThuoc,
    MaChiTietSanPham,
    TenKichThuoc,
    TenMau,
    MaHoaDon,
    TenSanPham,
    MaSanPham,
    NgayTao,
    DiaChiNhan,
    HinhThucThanhToan,
    TongTien,
    TrangThai,
    DienThoaiNhan,
    NguoiNhan,
    MaVanChuyen,
    TenVanChuyen,
    MaPhieu,
    TenPhieu,
    HoVaTen,
    Gia,
    GiaTri,
    LoaiPhieu,
    DuongDan
FROM 
    RankedCTE
WHERE 
    RowNum = 1;

call getinfoproductofdetailbillofsale(1);

DELIMITER //
create procedure getinfocustomerofdetailbillofsale(id int)
begin
	select cthd.*,ctsp.GiaBan,kh.MaKhachHang,kh.DiaChi,kh.HoVaTen,kh.DiaChi,kh.Email,kh.SoDienThoai
    from chitiethoadonban cthd 
		inner join hoadonban hd on hd.MaHoaDon = cthd.MaHoaDon
        inner join khachhang kh on kh.MaKhachHang = hd.MaKhachHang
	where cthd.MaHoaDon = id;
end //
DELIMITER ;

DELIMITER //
create procedure creatdetailbillofsale(
	_mahd int,
    _mact int,
    _soluong int,
    _giaban float,
    _tongtien float
)
begin
	insert into chitiethoadonban(MaHoaDon,MaChiTietSanPham,SoLuong,GiaBan,TongTien)
    values(_mahd,_mact,_soluong,_giaban,_tongtien);
end
// DELIMITER ;

call creatdetailbillofsale(31,1,2,145000,290000);

-- ========================================== loại phiếu giảm giá =========================================
DELIMITER //
create procedure getcategoryvoucher()
begin
	select * from loaiphieugiamgia;
end //
DELIMITER ;

DELIMITER //
create procedure getcategoryvoucherbyid(id int)
begin
	select * from loaiphieugiamgia where MaLoaiPhieu = id;
end //
DELIMITER ;

DELIMITER //
create procedure creatcategoryvoucher(
	_loaiphieu varchar(400),
    _giatri float,
    _giatrilon float,
    _giatrinho float
)
begin
	insert into loaiphieugiamgia(loaiphieu,giatri,giatrinhonhat,giatrilonnhat)
    values(_loaiphieu,_giatri,_giatrinho,_giatrilon);
end
// DELIMITER ;

DELIMITER //
create procedure deletecategoryvoucher(
	id int
)
begin
	delete from loaiphieugiamgia
    where MaLoaiPhieu = id;
end
// DELIMITER ;

DELIMITER //
create procedure updatecategoryvoucher(
	id int,
	_loaiphieu varchar(400),
    _giatri float,
    _giatrilon float,
    _giatrinho float
)
begin
	update loaiphieugiamgia
    set loaiphieu = _loaiphieu,
		giatri = _giatri,
        giatrilonnhat = _giatrilon,
        giatrinhonhat = _giatrinho
	where maloaiphieu = id;
end
// DELIMITER ;

DELIMITER //
CREATE PROCEDURE SearchCategorieVouchers(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM loaiphieugiamgia
    WHERE LoaiPhieu LIKE CONCAT('%', searchKeyword, '%') or giatri LIKE CONCAT('%', searchKeyword, '%')
    or giatrinhonhat LIKE CONCAT('%', searchKeyword, '%')
    or giatrilonnhat LIKE CONCAT('%', searchKeyword, '%');

    -- Tìm kiếm và trả về kết quả phân trang
    SELECT *
	FROM loaiphieugiamgia
    WHERE LoaiPhieu LIKE CONCAT('%', searchKeyword, '%') or giatri LIKE CONCAT('%', searchKeyword, '%')
    or giatrinhonhat LIKE CONCAT('%', searchKeyword, '%')
    or giatrilonnhat LIKE CONCAT('%', searchKeyword, '%')
    LIMIT offsetValue, itemsPerPage;
END //
DELIMITER 

-- ========================================== phiếu giảm giá =========================================
DELIMITER //
create procedure getvoucher()
begin
	select pg.*,lp.LoaiPhieu,lp.GiaTri,lp.GiaTriLonNhat,lp.GiaTriNhoNhat from phieugiamgia pg inner join loaiphieugiamgia lp on pg.MaLoaiPhieu = lp.MaLoaiPhieu;
end //
DELIMITER ;

DELIMITER //

CREATE PROCEDURE creatvouchercustomer(
    in idcustomer int,
    in idmaphieu int,
    in sl int
)
BEGIN
    DECLARE existing_record_count INT;
    
    -- Kiểm tra xem có dữ liệu với cặp (idcustomer, idmaphieu) đã tồn tại chưa
    SELECT COUNT(*) INTO existing_record_count
    FROM khachhang_phieugiamgia
    WHERE makhachhang = idcustomer AND maphieu = idmaphieu;
    
    -- Nếu có dữ liệu, thực hiện cập nhật
    IF existing_record_count > 0 THEN
        UPDATE khachhang_phieugiamgia
        SET soluong = soluong + sl
        WHERE makhachhang = idcustomer AND maphieu = idmaphieu;
        
        UPDATE phieugiamgia
        SET soluong = soluong - sl
        WHERE MaPhieu = idmaphieu;
    ELSE
        -- Nếu chưa có dữ liệu, thực hiện thêm mới
        INSERT INTO khachhang_phieugiamgia (makhachhang, maphieu, soluong)
        VALUES (idcustomer, idmaphieu, sl);
    END IF;
END //

DELIMITER ;

DELIMITER //
create procedure getvoucherbyuseridandvoucherid(userid int)
begin
	select pg.MaPhieu,lp.*,pg.NgayBatDau,pg.NgayKetThuc,pg.TenPhieu,kh.SoLuong,kh.MaKhachHang 
    from khachhang_phieugiamgia kh 
		inner join phieugiamgia pg on pg.MaPhieu = kh.MaPhieu
		inner join khachhang k on k.MaKhachHang = kh.MaKhachHang
        inner join loaiphieugiamgia lp on lp.MaLoaiPhieu = pg.MaLoaiPhieu
    where kh.MaKhachHang = userid;
end //
DELIMITER ;

call getvoucherbyuseridandvoucherid(11);

DELIMITER //
create procedure getvoucherbyid(id int)
begin
	select * from phieugiamgia where MaPhieu = id;
end //
DELIMITER ;

DELIMITER //
create procedure creatvoucher(
	_maloai int,
	_tenphieu varchar(400),
    _sl int,
    _sldadung int,
    _ngaybd date,
    _ngaykt date
)
begin
	insert into phieugiamgia(TenPhieu,MaLoaiPhieu,SoLuong,SoLuongDaDung,NgayBatDau,NgayKetThuc)
    values(_tenphieu,_maloai,_sl,_sldadung,_ngaybd,_ngaykt);
end
// DELIMITER ;

DELIMITER //
create procedure deletevoucher(
	id int
)
begin
	delete from phieugiamgia
    where MaPhieu = id;
end
// DELIMITER ;

DELIMITER //
create procedure updatevoucher(
	id int,
	_maloai int,
	_tenphieu varchar(400),
    _sl int,
    _sldadung int,
    _ngaybd date,
    _ngaykt date
)
begin
	update phieugiamgia
    set TenPhieu = _tenphieu,
		MaLoaiPhieu = _maloai,
        SoLuong = _sl,
        SoLuongDaDung = _sldadung,
        NgayBatDau = _ngaybd,
        NgayKetThuc = _ngaykt
	where maphieu = id;
end
// DELIMITER ;

DELIMITER //
CREATE PROCEDURE SearchVouchers(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM phieugiamgia
    WHERE tenphieu LIKE CONCAT('%', searchKeyword, '%') 
    or soluong LIKE CONCAT('%', searchKeyword, '%')
    or SoLuongDaDung LIKE CONCAT('%', searchKeyword, '%')
	or NgayBatDau LIKE CONCAT('%', searchKeyword, '%')
	or NgayKetThuc LIKE CONCAT('%', searchKeyword, '%');

    -- Tìm kiếm và trả về kết quả phân trang
    SELECT pg.*,lp.LoaiPhieu,lp.GiaTri,lp.GiaTriLonNhat,lp.GiaTriNhoNhat
    from phieugiamgia pg inner join loaiphieugiamgia lp on pg.MaLoaiPhieu = lp.MaLoaiPhieu
	WHERE pg.tenphieu LIKE CONCAT('%', searchKeyword, '%') or lp.giatri LIKE CONCAT('%', searchKeyword, '%')
    or pg.soluong LIKE CONCAT('%', searchKeyword, '%')
    or pg.SoLuongDaDung LIKE CONCAT('%', searchKeyword, '%')
	or pg.NgayBatDau LIKE CONCAT('%', searchKeyword, '%')
	or pg.NgayKetThuc LIKE CONCAT('%', searchKeyword, '%')
    LIMIT offsetValue, itemsPerPage;
END //
DELIMITER ;

call SearchVouchers("",1,5);

-- ========================================== vận chuyển =========================================
DELIMITER //
create procedure gettransport()
begin
	select * from vanchuyen;
end //
DELIMITER 

DELIMITER //
create procedure gettransportbyid(id int)
begin
	select * from vanchuyen where MaVanChuyen = id;
end //
DELIMITER ;

DELIMITER //
create procedure creattransport(
	_ten varchar(400),
    _gia float
)
begin
	insert into vanchuyen(TenVanChuyen,Gia)
    values(_ten,_gia);
end
// DELIMITER ;

DELIMITER //
create procedure deletetransport(
	id int
)
begin
	delete from vanchuyen
    where MaVanChuyen = id;
end
// DELIMITER ;

DELIMITER //
create procedure updatetransport(
	id int,
	_ten varchar(400),
    _gia float
)
begin
	update vanchuyen
    set tenvanchuyen = _ten,
		gia = _gia
	where mavanchuyen = id;
end
// DELIMITER ;

DELIMITER //
CREATE PROCEDURE SearchTransports(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM vanchuyen
    WHERE tenvanchuyen LIKE CONCAT('%', searchKeyword, '%') or gia LIKE CONCAT('%', searchKeyword, '%');

    -- Tìm kiếm và trả về kết quả phân trang
    SELECT *
	FROM vanchuyen
    WHERE tenvanchuyen LIKE CONCAT('%', searchKeyword, '%') or gia LIKE CONCAT('%', searchKeyword, '%')
    LIMIT offsetValue, itemsPerPage;
END //
DELIMITER ;

-- ========================================== loại chủ đề tin tức =========================================
DELIMITER //
create procedure getcategorydetailnews()
begin
	select * from chudetintuc;
end //
DELIMITER ;

DELIMITER //
create procedure getcategorydetailnewsbyid(id int)
begin
	select * from chudetintuc where MaChuDeTintuc = id;
end //
DELIMITER ;

DELIMITER //
create procedure creatcategorynews(
	_ten varchar(400)
)
begin
	insert into chudetintuc(tenchude)
    values(_ten);
end
// DELIMITER ;

DELIMITER //
create procedure deletecategorynews(
	id int
)
begin
	delete from chudetintuc
    where machudetintuc = id;
end
// DELIMITER ;

DELIMITER //
create procedure updatecategorynews(
	id int,
	_ten varchar(400)
)
begin
	update chudetintuc
    set tenchude = _ten
	where machudetintuc = id;
end
// DELIMITER ;

DELIMITER //
CREATE PROCEDURE SearchCategoryNews(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM chudetintuc
    WHERE TenChuDe LIKE CONCAT('%', searchKeyword, '%');

    -- Tìm kiếm và trả về kết quả phân trang
    SELECT *
	FROM chudetintuc
    WHERE TenChuDe LIKE CONCAT('%', searchKeyword, '%')
    LIMIT offsetValue, itemsPerPage;
END //
DELIMITER ;

-- ========================================== tin tức =========================================
DELIMITER //
create procedure getnews()
begin
	select * from tintuc;
end //
DELIMITER ;

DELIMITER //
create procedure getnewsbyid(id int)
begin
	select * from tintuc where matin = id;
end //
DELIMITER ;

DELIMITER //
create procedure creatnews(
	_tieude varchar(1000),
    _machude int,
    _ngaytao date,
    _nd text,
    _anh varchar(300),
    _mand int,
    _trangthai bit
)
begin
	insert into tintuc(TieuDe,MaChuDeTinTuc,NgayTao,NoiDung,Anh,MaNguoiDung,TrangThai)
    values(_tieude,_machude,_ngaytao,_nd,_anh,_mand,_trangthai);
end
// DELIMITER ;

DELIMITER //
create procedure deletenews(
	id int
)
begin
	delete from tintuc
    where matin = id;
end
// DELIMITER ;

DELIMITER //
create procedure updatenews(
	id int,
	_tieude varchar(1000),
    _machude int,
    _ngaytao date,
    _nd text,
    _anh varchar(300),
    _mand int,
    _trangthai bit
)
begin
	update tintuc
    set TieuDe = _tieude,
		MaChuDeTinTuc = _machude,
        NgayTao = _ngaytao,
        NoiDung = _nd,
        Anh = _anh,
        MaNguoiDung = _mand,
        TrangThai = _trangthai
	where matin = id;
end
// DELIMITER ;

DELIMITER //
CREATE PROCEDURE SearchNews(
    IN searchKeyword VARCHAR(255),
    IN pageNumber INT,
    IN itemsPerPage INT
)
BEGIN
    DECLARE offsetValue INT DEFAULT 0;
    
    -- Tính toán giá trị offset
    SET offsetValue = (pageNumber - 1) * itemsPerPage;
    
     SELECT count(*) as totalperpages
    FROM tintuc tt inner join chudetintuc cd on tt.MaChuDeTintuc = cd.MaChuDeTintuc 
		inner join nguoidung nd on nd.MaNguoiDung = tt.MaNguoiDung
    WHERE tt.tieude LIKE CONCAT('%', searchKeyword, '%') or cd.TenChuDe LIKE CONCAT('%', searchKeyword, '%')
		or tt.NgayTao LIKE CONCAT('%', searchKeyword, '%')
        or tt.NoiDung LIKE CONCAT('%', searchKeyword, '%')
        or tt.Anh LIKE CONCAT('%', searchKeyword, '%')
        or tt.TrangThai LIKE CONCAT('%', searchKeyword, '%')
        or nd.HoTen LIKE CONCAT('%', searchKeyword, '%');

    -- Tìm kiếm và trả về kết quả phân trang
    SELECT tt.*,nd.HoTen,cd.TenChuDe
	FROM tintuc tt inner join chudetintuc cd on tt.MaChuDeTintuc = cd.MaChuDeTintuc 
		inner join nguoidung nd on nd.MaNguoiDung = tt.MaNguoiDung
    WHERE tt.tieude LIKE CONCAT('%', searchKeyword, '%') or cd.TenChuDe LIKE CONCAT('%', searchKeyword, '%')
		or tt.NgayTao LIKE CONCAT('%', searchKeyword, '%')
        or tt.NoiDung LIKE CONCAT('%', searchKeyword, '%')
        or tt.Anh LIKE CONCAT('%', searchKeyword, '%')
        or tt.TrangThai LIKE CONCAT('%', searchKeyword, '%')
        or nd.HoTen LIKE CONCAT('%', searchKeyword, '%')
    LIMIT offsetValue, itemsPerPage;
END //
DELIMITER ;