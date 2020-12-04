import { Server } from '@hapi/hapi';
import { bootstrapIoc, bootstrapRoutes } from '../configs/bootstrap';
import { connectToDatabase } from './db';
import { plugins } from './plugins';
import jwtAuth from 'hapi-auth-jwt2';
import { isTokenValidate } from '../middlewares/auth.middleware';

export class HapiServer {
    private _instance: Server;

    constructor(port: number, host: string) {
        this._instance = new Server({
            port,
            host,
            routes: {
                cors: {
                    origin: ['*'] // an array of origins or 'ignore'           
                },
                payload: {
                    allow: ['application/json', 'application/x-www-form-urlencoded']
                }
            }
        });
    }

    public async start(): Promise<Server> {
        await connectToDatabase();
        bootstrapIoc(this._instance);
        bootstrapRoutes();       

        await this._instance.register(plugins);
        await this._instance.register(jwtAuth);
        this.registerDefaultAuth();
        
        await this._instance.start();
        
        return this._instance;
    }

    private registerDefaultAuth() {
        this._instance.auth.strategy('jwt', 'jwt', {
                key: process.env.JWT_KEY,
                validate: isTokenValidate,
                algorithms: [ 'HS256' ]
            });
        this._instance.auth.default('jwt');
    }
}
