const Sequelize = require('sequelize');

const connection = require('./database');

const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING, // tipo do dado para criar o campo titulo
        allowNull: false // Permitir nulo igual ao falso
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }

});

Pergunta.sync({force: false}) // Cria a tabela (syncroniza com o BD)
    .then(() => {});

module.exports = Pergunta;