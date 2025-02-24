const Sequelize = require(`sequelize`);

const sequelize = new Sequelize('attendance-app', 'root', 'root',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;