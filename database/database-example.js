const Sequelize = require('sequelize');

const connection = new Sequelize('<data_base_name>','<user>','<password>',{
    host: 'localhost',
    dialect: 'mysql'
});