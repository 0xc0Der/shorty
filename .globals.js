const globals = {
    DB_PATH: new URL('./db/files/db.sqlite', import.meta.url).pathname,
    FILES_PATH: new URL('./public', import.meta.url).pathname,
    CACHE_TTL: 3600,
    PORT: 3000
};

export default globals;
