import { IUserJwt } from "../api/v1/user/user.controller";

import jwt from 'jsonwebtoken';

export const generateJwt = (user: IUserJwt) => {
    return jwt.sign(
        user,
        process.env.JWT_KEY + '',
        {
            expiresIn: '7 days'
        });
};

export const verifyJwtToken = (token: string) => {
    return jwt.verify(
        token,
        process.env.JWT_KEY + '',
    );
}

export const decodeJwtToken = (token: string) => {
    return jwt.decode(token) as IUserJwt;
}

