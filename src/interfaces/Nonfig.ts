import { NonfigResponse } from './IConfiguration';

export interface Nonfig {
    findByPath(path: string): Promise<NonfigResponse>;
    findByName(name: string): Promise<NonfigResponse>;
    findById(id: string): Promise<NonfigResponse>;
    findByLabels(labels: string[]): Promise<NonfigResponse>;
}
