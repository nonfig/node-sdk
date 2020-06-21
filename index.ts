import { IConnection, IOption } from './src/interfaces';
import { Api } from './src/api';

const DEFAULT_HOST = 'app.nonfig.com';
const DEFAULT_PORT = 443;
const DEFAULT_BASE_PATH = '/api/';
const DEFAULT_API_VERSION = 'v1';
const DEFAULT_TIMEOUT = 80000;

export function nonfig(options: IOption): Api {
    const connection: IConnection = {
        host: DEFAULT_HOST,
        port: DEFAULT_PORT,
        basePath: DEFAULT_BASE_PATH,
        apiVersion: DEFAULT_API_VERSION,
        timeout: DEFAULT_TIMEOUT,
    };

    return new Api(connection, options);
}

export * from './src/interfaces';
