import fetch from 'node-fetch';
import {IConfigurationResponse, IHeaders, NonfigResponse} from './interfaces';
import {NonfigError} from './error';

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
        const body: IConfigurationResponse = response.json();

        if (!body.success) {
            throw new NonfigError(body.error);
        }

        return body.data;
    }
}
