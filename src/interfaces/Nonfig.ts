import { Configuration } from '../configuration.entity';

export interface Nonfig {
    findByPath(path: string): Promise<Configuration & Configuration[]>;
    findByName(name: string): Promise<Configuration & Configuration[]>;
    findById(id: string): Promise<Configuration & Configuration[]>;
    findByLabels(labels: string[]): Promise<Configuration & Configuration[]>;
}
