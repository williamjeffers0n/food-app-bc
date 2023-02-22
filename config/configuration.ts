export default () => ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    database: {
        host: process.env.DB_HOSTNAME,
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
});
