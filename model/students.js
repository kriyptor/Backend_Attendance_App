const { DataTypes } = require(`sequelize`);
const db = require(`../utils/database`);

const Students = db.define("students", {
    id : {
        type : DataTypes.INTEGER,
        allowNull :  false,
        autoIncrement : true,
        primaryKey: true
    },

    name : {
        type : DataTypes.STRING,
        allowNull :  false
    }
});

module.exports = Students;