import { IConnection, IOption } from './interfaces';
import { NonfigRequest } from './request';
import { Nonfig } from './interfaces';
import { Configuration } from './configuration.entity';
import { CacheFactory } from './cache';
import { IRequestOption } from './interfaces/IRequestOption';

export class Api implements Required<Nonfig> {
    private _options: IOption;
    private readonly _connection: IConnection;

    constructor(connection: IConnection, options: IOption) {
        this._connection = connection;
        this._options = options;
        CacheFactory.setTtl(options.cacheTtl);
    }

    public findByPath(
        path: string,
        options: IRequestOption = { noCache: false }
    ) {
        return this.runFetchRequest(`configurations/path/${path}`, options);
    }

    public findByName(
        name: string,
        options: IRequestOption = { noCache: false }
    ) {
        return this.runFetchRequest(`configurations/name/${name}`, options);
    }

    public findById(id: string, options: IRequestOption = { noCache: false }) {
        return this.runFetchRequest(`configurations/id/${id}`, options);
    }

    public findByLabels(
        labels: string[],
        options: IRequestOption = { noCache: false }
    ) {
        return this.runFetchRequest(
            `configurations/labels/${labels.join(',')}`,
            options
        );
    }

    private getHeaders() {
        let userAgent = `Nonfig/v1 ${this._options.agent || 'NodeBindings'}`;
        return {
            'User-Agent': userAgent,
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
        path: string,
        options: IRequestOption
    ): Promise<Configuration[]> {
        return NonfigRequest.exec(
            this.getQualifiedUrl(path),
            this.getHeaders(),
            options
        );
    }
}
