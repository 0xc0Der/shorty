import express from 'express';
import Url from '../db/helpers/url.js';
import globals from '../.globals.js';

const url = express.Router();
const db = new Url(globals.DB_PATH);

url.get('/:id', async (req, res) => {
    const url = await db.get(req.params.id);

    if (url) {
        res.json(url);
    } else {
        res.sendStatus(404);
    }
});

url.get('/:id/info', (req, res) => {
    const info = db.getInfo(req.params.id);

    if (info) {
        res.json(info);
    } else {
        res.sendStatus(404);
    }
});

url.post('/', (req, res) => {
    const { id, uid, url } = req.body;

    try {
        db.add({ id, uid, url });
        res.sendStatus(201);
    } catch (_) {
        res.sendStatus(400);
    }
});

url.put('/:id', (req, res) => {
    const { extend, uid } = req.body;
    const id = req.params.id;

    try {
        const c1 = uid && db.changeOwner(id, uid).changes;
        const c2 = extend && db.extend(id, extend).changes;

        res.sendStatus(c1 || c2 ? 200 : 404);
    } catch (_) {
        res.sendStatus(400);
    }
});

url.delete('/:id', (req, res) => {
    const { uid } = req.body;
    const { changes } = db.delete(req.params.id, { uid });

    res.sendStatus(changes ? 200 : 404);
});

export default url;
