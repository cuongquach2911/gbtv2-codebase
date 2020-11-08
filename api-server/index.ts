import { HapiServer } from './server';

const hapiServer = new HapiServer(3000, "localhost");
hapiServer
    .start()
    .then((instance) => console.log('Server running on %s', instance.info.uri))
    .catch((error) => console.error());
