import { Server } from '@hapi/hapi';
import { autoLoadIoc, autoLoadRoutes } from '../configs/autoload';
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
        autoLoadIoc();
        autoLoadRoutes(this._instance);       

        await this._instance.register(plugins);
        await this._instance.start();
        
        return this._instance;
    }
}
