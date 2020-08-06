import { Configuration } from '../configuration.entity';

export interface Nonfig {
    findByPath(path: string): Promise<Configuration[]>;
    findByName(name: string): Promise<Configuration[]>;
    findById(id: string): Promise<Configuration[]>;
    findByLabels(labels: string[]): Promise<Configuration[]>;
}
