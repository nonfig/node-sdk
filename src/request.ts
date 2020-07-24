import fetch from 'node-fetch';
import { IConfigurationResponse, IHeaders } from './interfaces';
import { NonfigError } from './error';
import { Configuration } from './configuration.entity';

export class NonfigRequest {
    static async exec(
        path: string,
        headers: Partial<IHeaders>
    ): Promise<Configuration & Configuration[]> {
        const request: Promise<any> = fetch(path, {
            method: 'GET',
            headers,
        });
        const response = await request;
        const body: IConfigurationResponse = await response.json();

        if (!body.success) {
            throw new NonfigError(body.error || body.message);
        }

        let data;
        if (Array.isArray(body.data)) {
            data = body.data.map(
                (configuration) => new Configuration(configuration)
            );
        } else {
            data = new Configuration(body.data);
        }

        return data;
    }
}
