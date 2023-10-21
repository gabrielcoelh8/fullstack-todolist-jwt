const sequelize = require('sequelize');
const database = require('../db');

class User extends sequelize.Model {
}

User.init(
    {
        id:
        {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user_name:
        {
            type: sequelize.STRING,
            allowNull: false
        },
        password:
        {
            type: sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize: database,
        modelName: 'tb_user'
    }
)

module.exports = User;