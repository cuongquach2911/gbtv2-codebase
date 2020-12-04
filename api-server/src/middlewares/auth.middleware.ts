import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { decodeJwtToken, verifyJwtToken } from "../helpers/auth.helper";

// Obsolute function
export const authMiddleware = (request: Request, reply: ResponseToolkit) => {
    if (!request.headers['access_token'] || !verifyJwtToken(request.headers['access_token'])) {
        throw Boom.unauthorized('Your token has been sent is unpermitted to user');
    }
    return decodeJwtToken(request.headers['access_token']);
};

export const isTokenValidate = (decoded: any, request: Request) => {
        return (decoded)
            ? { isValid: true }
            : { isValid: false };
}
