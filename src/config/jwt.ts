import { injectable } from "tsyringe";

import jwt from "jsonwebtoken";

import {config} from "./config"

@injectable()
export class Authentication {
    private readonly secretKey = config.jwt.key;
    private readonly expiresIn = config.jwt.time;

    public generateToken(user: any): string {
        const payload = {
            userId: user.MaNguoiDung,
            username: user.HoTen,
            role: user.Quyen,
        };        
        
        return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
    }

    // public generateRefreshToken(user: any): string {
    //     const payload = {
    //         userId: user[0].MaNguoiDung,
    //         username: user[0].HoTen,
    //         role: user[0].Quyen,
    //     };
    //     return jwt.sign(payload, 'my_refresh_key', { expiresIn: '3m' });
    // }
}

export function verifyToken(token: string){
    try {
        const decoded = jwt.verify(token, config.jwt.key);
        return decoded;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
}


