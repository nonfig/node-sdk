import { Configuration } from '../configuration.entity';
import { IRequestOption } from './IRequestOption';

export interface Nonfig {
    findByPath(
        path: string,
        options?: IRequestOption
    ): Promise<Configuration[]>;
    findByName(
        name: string,
        options?: IRequestOption
    ): Promise<Configuration[]>;
    findById(id: string, options?: IRequestOption): Promise<Configuration[]>;
    findByLabels(
        labels: string[],
        options?: IRequestOption
    ): Promise<Configuration[]>;
}
