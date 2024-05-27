export const config = { port: process.env.PORT || 3000,
    db: {
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'passwordmysql',
    database: process.env.DB_NAME || 'databasename', 
    },
    jwt:{
        key:process.env.KEY_TOKEN || 'my_secret_key',
        time:process.env.TIME_TOKEN || '1m'
    }
};