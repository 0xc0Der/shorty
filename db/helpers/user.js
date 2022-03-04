import DBHandler from './db.js';

export default class User {
    constructor(dbPath) {
        this.db = new DBHandler(dbPath);
    }

    setupTable() {
        return this.db.createTable('users', {
            crd: "date default(datetime('now'))",
            xpd: "date default(datetime('now', '1 months'))",
            id: 'text not null primary key'
        });
    }

    add(id) {
        return this.db.add('users', { id });
    }

    get(id) {
        return this.db.getById('users', id);
    }

    getUrls(id) {
        return this.db.getByUid('urls', id);
    }

    delete(id) {
        return this.db.deleteById('users', id, {});
    }

    extend(id, mos) {
        return this.db.extend('users', id, mos);
    }
}
