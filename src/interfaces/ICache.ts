import {Configuration} from "../configuration.entity";

export interface ICache {
    store(key: string, response: Configuration[]): void;
    retrieve(key: string): Configuration[];
    isCacheStale(): boolean;
    setTtl(ttl: number): void;
}

export interface CacheStorage {
    [key: string]: Configuration[]
}
