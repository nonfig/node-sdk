import {IConnection, IOption} from "../../src/interfaces";

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
    timeout: DEFAULT_TIMEOUT
};

export const options: IOption = {
    appId: "",
    appSecret: "",
    debug: false,
    cacheEnable: false,
    cacheTtl: 1000
};