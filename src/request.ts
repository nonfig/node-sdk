import fetch from 'node-fetch';
import { IConfigurationResponse, IHeaders, NonfigResponse } from './interfaces';
import { NonfigError } from './error';
import { Configuration } from './configuration.entity';

export class NonfigRequest {
    static async exec(
        path: string,
        headers: Partial<IHeaders>
    ): Promise<NonfigResponse> {
        const request: Promise<any> = fetch(path, {
            method: 'GET',
            headers,
        });
        const response = await request;
        const body: IConfigurationResponse = await response.json();

        if (!body.success) {
            throw new NonfigError(body.error || body.message);
        }

        if (Array.isArray(body.data)) {
            return body.data.map(
                (configuration) => new Configuration(configuration)
            );
        }

        return new Configuration(body.data);
    }
}
