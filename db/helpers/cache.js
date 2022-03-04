import { createClient } from 'redis';
import globals from '../../.globals.js';

export default class cacheHandler {
    DEFAULT_TTL = globals.CACHE_TTL;

    constructor() {
        this.client = createClient();

        (async () => await this.client.connect())();
    }

    async get(id) {
        return await this.client.get(id, { EX: this.DEFAULT_TTL });
    }

    async add(id, url) {
        return await this.client.set(id, url, { EX: this.DEFAULT_TTL });
    }

    async exists(id) {
        return await this.client.exists(id);
    }

    quit() {
        this.client.quit();
    }
}
