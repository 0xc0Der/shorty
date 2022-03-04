import Database from 'better-sqlite3';

export default class DBHandler {
    constructor(file) {
        this.db = new Database(file);
    }

    createTable(table, fields) {
        return this.db
            .prepare(
                `CREATE TABLE IF NOT EXISTS ${table} (${Object.entries(fields)
                    .map(col => col[0] + ' ' + col[1])
                    .join()})`
            )
            .run();
    }

    add(table, data) {
        const keys = Object.keys(data);

        return this.db
            .prepare(
                `INSERT INTO ${table} (${keys.join()}) VALUES (${keys
                    .map(key => '@' + key)
                    .join()})`
            )
            .run(data);
    }

    getById(table, id) {
        return this.db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id);
    }

    getByUid(table, uid) {
        return this.db.prepare(`SELECT * FROM ${table} WHERE uid = ?`).all(uid);
    }

    deleteById(table, id, conds) {
        return this.db.prepare(`DELETE FROM ${table} WHERE id = ?${
            Object.keys(conds).length ? 
                ' AND ' + Object.keys(conds)
                .map(cond => cond + ' = ?').join(' AND ')
            : ''
        }`).run(id, ...Object.values(conds));
    }

    extend(table, id, mos) {
        return this.db
            .prepare(
                `UPDATE ${table} SET xpd = datetime(xpd, '${mos} months') WHERE id = ?`
            )
            .run(id);
    }

    changeUid(table, id, uid) {
        return this.db
            .prepare(
                `UPDATE ${table} SET uid = ? WHERE id = ?`
            )
            .run(uid, id);
    }

}
