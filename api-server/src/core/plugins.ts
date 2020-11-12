import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Vision from '@hapi/vision'
import * as Inert from '@hapi/inert'

const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
        title: process.env.API_SERVER_NAME ? process.env.API_SERVER_NAME : `API Server Endpoints Document`,
        version: process.env.API_VERSION ? process.env.API_VERSION : `unknown`
    }
};

const hapiSwaggerPlugin = {
    plugin: HapiSwagger,
    options: swaggerOptions
};

export const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
    { plugin: Inert },
    { plugin: Vision },
    hapiSwaggerPlugin
];
