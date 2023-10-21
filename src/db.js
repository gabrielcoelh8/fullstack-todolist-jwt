require('dotenv').config()
const sequelize = require('sequelize')

const database = new sequelize(
    'agro',
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres', host: 'localhost', port: 5432
    }
);

database.sync();

module.exports = database;