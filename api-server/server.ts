import { Server, Request, ResponseToolkit } from '@hapi/hapi';

export class HapiServer {
    private _instance: Server;

    constructor(port: number, host: string) {
        this._instance = new Server({
            port,
            host
        })
    }

    private async mapRoutes() {
        this._instance.route({
            method: 'GET',
            path: '/',
            handler: (request: Request, response: ResponseToolkit) => {
                return("Hello World");
            }
        })
    }

    public async start(): Promise<Server> {
        this.mapRoutes();
        await this._instance.start();
        return this._instance;
    }
}
