import jwt from 'jsonwebtoken';
import { IUserJwt } from '../interfaces/IUserJwt';

export const generateJwt = (user: IUserJwt) => {
    return jwt.sign(
        user,
        `${process.env.JWT_KEY}`,
        {
            expiresIn: '7 days'
        });
};

export const verifyJwtToken = (token: string) => {
    return jwt.verify(
        token,
        `${process.env.JWT_KEY}`,
    );
}

export const decodeJwtToken = (token: string) => {
    return jwt.decode(token) as IUserJwt;
}

