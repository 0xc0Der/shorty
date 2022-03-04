import Url from '../db/helpers/url.js';
import User from '../db/helpers/user.js';
import globals from '../.globals.js';

const path = globals.DB_PATH;

const urlDB = new Url(path);
const userDB = new User(path);

urlDB.setupTable();
userDB.setupTable();
