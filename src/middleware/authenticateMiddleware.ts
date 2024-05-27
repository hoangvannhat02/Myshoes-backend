import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { verifyToken } from "../config/jwt";
import { config } from "../config/config";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Lỗi lấy token!' })
    }

    try {
        jwt.verify(token,config.jwt.key, (err) => {
            if (err) {
              // Gửi mã lỗi đặc biệt khi token hết hạn
              return res.status(401).send({ error: 'TokenExpired', message: 'Access token has expired' });
            }
            next();
          });
        // const decoded: any = jwt.verify(token, config.jwt.key);
        // if (!decoded) {
        //     return res.status(401).json({ message: 'Bạn không được cấp quyền!' });
        // }
        // next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ message: 'Có lỗi xảy ra!' })
    }
}

export const checkPermission = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Kiểm tra và giải mã token từ header
        const token = req.header('Authorization').replace('Bearer ', '');
    
        if (!token) {
          return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }
    
        const decoded = verifyToken(token);
    
        if (!decoded) {
          return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    
        // Kiểm tra quyền
        const userRole = decoded.role;
    
        if (userRole !== requiredRole) {
          return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }
    
        next(); 
      };
}