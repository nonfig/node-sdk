import { IConnection, IOption } from './interfaces';
import { NonfigRequest } from './request';
import { Nonfig } from './interfaces';
import { Configuration } from './configuration.entity';

export class Api implements Required<Nonfig> {
    private _options: IOption;
    private readonly _connection: IConnection;

    constructor(connection: IConnection, options: IOption) {
        this._connection = connection;
        this._options = options;
    }

    public findByPath(path: string) {
        return this.runFetchRequest(`configurations/path/${path}`);
    }

    public findByName(name: string) {
        return this.runFetchRequest(`configurations/name/${name}`);
    }

    public findById(id: string) {
        return this.runFetchRequest(`configurations/id/${id}`);
    }

    public findByLabels(labels: string[]) {
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

    private runFetchRequest(
        path: string
    ): Promise<Configuration & Configuration[]> {
        return NonfigRequest.exec(
            this.getQualifiedUrl(path),
            this.getHeaders()
        );
    }
}
