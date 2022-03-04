import express from 'express';
import api from './api/api.js';
import app from './app/app.js';
import globals from './.globals.js';

const shorty = express();

shorty.use(express.static('public'));
shorty.use(express.json());
shorty.use('/api', api);
shorty.use('/', app);

shorty.listen(globals.PORT, () => {
    console.log(`shorty is running on port ${globals.PORT}.`);
});
