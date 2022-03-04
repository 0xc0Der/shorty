import express from 'express';
import url from './url.js';
import user from './user.js';

const api = express.Router();

api.use('/url', url);
api.use('/user', user);

api.use((req, res, next) => {
    res.sendStatus(404);
});

api.use((error, req, res, next) => {
    res.sendStatus(500);
});

export default api;
