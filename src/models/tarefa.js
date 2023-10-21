const sequelize = require('sequelize');
const database = require('../db');

class Tarefa extends sequelize.Model {
}

Tarefa.init(
    {
        id:
        {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        titulo:
        {
            type: sequelize.STRING,
            allowNull: false
        },
        descricao:
        {
            type: sequelize.STRING,
            allowNull: false
        },
        prazo_final:
        {
            type: sequelize.DATE,
            allowNull: false
        },
        data_de_insercao:
        {
            type: sequelize.DATE,
            allowNull: false
        },
        status: {
            type: sequelize.ENUM,
            values: ['Em espera', 'Iniciado', 'Pausado', 'Concluido']
        }

    },
    {
        sequelize: database,
        modelName: 'tb_tarefa'
    }
)

module.exports = Tarefa;