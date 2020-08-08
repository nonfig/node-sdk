import { CacheStorage, ICache } from './interfaces/ICache';
import { Configuration } from './configuration.entity';
import { get, isEmpty, has } from 'lodash';
const DEFAULT_TTL = 60000;

class Cache implements ICache {
    private static instance: Cache;
    private cacheTTL: number;
    private lastFetchedAt: number;
    private responses: CacheStorage = {};

    constructor(cacheTTL: number) {
        this.cacheTTL = cacheTTL;
        this.lastFetchedAt = 0;
        Cache.instance = this;
    }

    retrieve(key: string): Configuration[] {
        return get(this.responses, key, []);
    }

    ifExists(key: string) {
        return has(this.responses, key);
    }

    store(key: string, response: Configuration[]): void {
        this.lastFetchedAt = Date.now();
        this.responses[key] = response;
    }

    isCacheStale(): boolean {
        return Date.now() - this.lastFetchedAt > this.cacheTTL;
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
