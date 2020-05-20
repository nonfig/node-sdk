import { IConnection, IOption, NonfigResponse } from './interfaces';
import { NonfigRequest } from './request';

export default class Api {
    private _options: IOption;
    private readonly _connection: IConnection;

    constructor(connection: IConnection, options: IOption) {
        this._connection = connection;
        this._options = options;
    }

    public findByPath(path: string): Promise<NonfigResponse> {
        return this.runFetchRequest(`configurations/path/${path}`);
    }

    public findByName(name: string): Promise<NonfigResponse> {
        return this.runFetchRequest(`configurations/name/${name}`);
    }

    public findById(id: string): Promise<NonfigResponse> {
        return this.runFetchRequest(`configurations/id/${id}`);
    }

    public findByLabels(labels: string[]): Promise<NonfigResponse> {
        return this.runFetchRequest(
            `configurations/labels/${labels.join(',')}`
        );
    }

    private getHeaders() {
        return {
            'User-Agent': `Nonfig/v1 NodeBindings`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${this._options.appId}:${this._options.appSecret}`,
        };
    }

    private getQualifiedUrl(path): string {
        const { host, port, basePath, apiVersion } = this._connection;

        return `https://${host}:${port}${basePath}${apiVersion}/${path}`;
    }

    private runFetchRequest(path: string): Promise<NonfigResponse> {
        return NonfigRequest.exec(
            this.getQualifiedUrl(path),
            this.getHeaders()
        );
    }
}
