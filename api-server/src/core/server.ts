import { Server } from '@hapi/hapi';
import { bootstrapIoc, bootstrapRoutes } from '../configs/bootstrap';
import { connectToDatabase } from './db';
import { plugins } from './plugins';

export class HapiServer {
    private _instance: Server;

    constructor(port: number, host: string) {
        this._instance = new Server({
            port,
            host,
            routes: {
                cors: {
                    origin: ['*'] // an array of origins or 'ignore'           
                }
            }
        });
    }

    public async start(): Promise<Server> {
        await connectToDatabase();
        bootstrapIoc(this._instance);
        bootstrapRoutes();       

        await this._instance.register(plugins);
        await this._instance.start();
        
        return this._instance;
    }
}
