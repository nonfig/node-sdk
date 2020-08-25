import fetch from 'node-fetch';
import { IConfigurationResponse, IHeaders } from './interfaces';
import { NonfigError } from './error';
import { Configuration } from './configuration.entity';
import { CacheFactory } from './cache';

export class NonfigRequest {
    static async exec(
        path: string,
        headers: Partial<IHeaders>
    ): Promise<Configuration[]> {
        const fromCache = CacheFactory.ifExistsInCache(path);

        if (fromCache) {
            return fromCache;
        }

        const request: Promise<any> = fetch(path, {
            method: 'GET',
            headers,
        });
        const response = await request;
        const body: IConfigurationResponse = await response.json();

        if (!body.success) {
            throw new NonfigError(body.error || body.message);
        }

        const data = body.data.map(
            (configuration) => new Configuration(configuration)
        );

        CacheFactory.store(path, data);

        return data;
    }
}
