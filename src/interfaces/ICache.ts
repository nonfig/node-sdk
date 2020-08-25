import { Configuration } from '../configuration.entity';

export interface ICache {
    store(key: string, response: Configuration[]): void;
    retrieve(key: string): CachePathResponse;
    ifExistsInCache(path: string): Configuration[];
    setTtl(ttl: number): void;
}

export interface CachePathResponse {
    fetchedAt: number;
    data: Configuration[];
}

export interface CacheStorage {
    [key: string]: CachePathResponse;
}
