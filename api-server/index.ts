import 'reflect-metadata';
import logger from './src/core/logger';
import { HapiServer } from './src/core/server';

const hapiServer = new HapiServer(
    Number(process.env.API_PORT),
    `${process.env.API_HOST}`
);
hapiServer
    .start()
    .then((server) => console.log('Server running on %s', server.info.uri))
    .catch((error) => console.error(error));

process.on('unhandledRejection', (err) => {
    logger.log({ level: 'error', message: err + '' });
    process.exit(1);
});
