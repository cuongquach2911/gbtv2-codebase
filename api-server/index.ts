import 'reflect-metadata';
import { HapiServer } from './src/core/server';

const hapiServer = new HapiServer(3000, "localhost");
hapiServer
    .start()
    .then((server) => console.log('Server running on %s', server.info.uri))
    .catch((error) => console.error(error));
