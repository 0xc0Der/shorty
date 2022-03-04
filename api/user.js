import express from 'express';
import User from '../db/helpers/user.js';
import globals from '../.globals.js';

const user = express.Router();
const db = new User(globals.DB_PATH);

user.get('/:id', (req, res) => {
    const url = db.get(req.params.id);

    if (url) {
        res.json(url);
    } else {
        res.sendStatus(404);
    }
});

user.get('/:id/urls', (req, res) => {
    const info = db.getUrls(req.params.id);

    if (info) {
        res.json(info);
    } else {
        res.sendStatus(404);
    }
});

user.post('/', (req, res) => {
    const { id } = req.body;

    try {
        db.add(id);
        res.sendStatus(201);
    } catch (_) {
        res.sendStatus(400);
    }
});

user.put('/:id', (req, res) => {
    const { extend } = req.body;
    const id = req.params.id;

    try {
        const c = extend && db.extend(id, extend).changes;

        res.sendStatus(c ? 200 : 404);
    } catch (_) {
        res.sendStatus(400);
    }
});

user.delete('/:id', (req, res) => {
    const { changes } = db.delete(req.params.id);

    res.sendStatus(changes ? 200 : 404);
});

export default user;
