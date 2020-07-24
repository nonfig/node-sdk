import { ConfigType, IConnection, IOption } from '../../src/interfaces';
import { Configuration } from '../../src/configuration.entity';

const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 443;
const DEFAULT_BASE_PATH = '/';
const DEFAULT_API_VERSION = 'v1';
const DEFAULT_TIMEOUT = 80000;

export const connection: IConnection = {
    host: DEFAULT_HOST,
    port: DEFAULT_PORT,
    basePath: DEFAULT_BASE_PATH,
    apiVersion: DEFAULT_API_VERSION,
    timeout: DEFAULT_TIMEOUT,
};

export const options: IOption = {
    appId: '',
    appSecret: '',
    debug: false,
    cacheEnable: false,
    cacheTtl: 1000,
};

export const testResponse: Configuration[] = [
    {
        label: ['test'],
        version: 1,
        name: 'test-1',
        path: '/some/path/',
        description: '',
        type: ConfigType.JSON,
        data: '{}',
        fullyQualifiedName: '/some/path/test-1',
        id: 'random-id',
    },
];
