import jwt from 'jsonwebtoken';
import { IUserJwt } from '../interfaces/IUserJwt';
import { Request } from "@hapi/hapi";

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
};

export const decodeJwtToken = (token: string) => {
    return jwt.decode(token) as IUserJwt;
};

export const extractUser = (request: Request) => {
    return {
        username: `${request.auth.credentials.user}`,
        scopes: request.auth.credentials.scope,
        isRoot: request.auth.credentials.isRoot
    }
};

