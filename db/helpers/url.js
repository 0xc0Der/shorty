import DBHandler from './db.js';
import CacheHandler from './cache.js';

export default class Url {
    constructor(dbPath) {
        this.db = new DBHandler(dbPath);
    }

    setupTable() {
        return this.db.createTable('urls', {
            url: 'text not null',
            crd: "date default(datetime('now'))",
            xpd: "date default(datetime('now', '1 months'))",
            uid: 'text not null references users(id)',
            id: 'text not null primary key'
        });
    }

    add(data) {
        this.db.add('urls', data);
    }

    async get(id) {
        const cache = new CacheHandler();
        const url = (await cache.get(id)) ?? this.db.getById('urls', id)?.url;

        if (url && !(await cache.exists(id))) {
            await cache.add(id, url);
        }

        cache.quit();

        return url;
    }

    getInfo(id) {
        return this.db.getById('urls', id);
    }

    delete(id, conds) {
        return this.db.deleteById('urls', id, conds);
    }

    extend(id, mos) {
        return this.db.extend('urls', id, mos);
    }

    changeOwner(id, uid) {
        return this.db.changeUid('urls', id, uid);
    }
}
