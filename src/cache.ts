import { CachePathResponse, CacheStorage, ICache } from './interfaces/ICache';
import { Configuration } from './configuration.entity';
import { get, isEmpty, unset } from 'lodash';
const DEFAULT_TTL = 60000;

class Cache implements ICache {
    private static instance: Cache;
    private cacheTTL: number;
    private responses: CacheStorage = {};

    constructor(cacheTTL: number) {
        this.cacheTTL = cacheTTL;
        Cache.instance = this;
    }

    ifExistsInCache(path: string): Configuration[] {
        const response = get(this.responses, path, null) as CachePathResponse;

        if (isEmpty(response)) {
            return null;
        }
        const isStale = Date.now() - response.fetchedAt > this.cacheTTL;

        if (isStale) {
            unset(this.responses, path);
            return null;
        }

        return response.data;
    }

    retrieve(key: string): CachePathResponse {
        return get(this.responses, `${key}`, null);
    }

    store(key: string, response: Configuration[]): void {
        this.responses[key] = {
            fetchedAt: Date.now(),
            data: response,
        };
    }

    setTtl(ttl: number = DEFAULT_TTL): void {
        this.cacheTTL = ttl;
    }

    static getInstance() {
        if (isEmpty(Cache.instance)) {
            Cache.instance = new Cache(DEFAULT_TTL);
        }

        return Cache.instance;
    }
}

export const CacheFactory = Cache.getInstance();
