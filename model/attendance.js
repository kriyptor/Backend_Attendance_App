const { DataTypes } = require(`sequelize`);
const db = require(`../utils/database`);

const Attendance = db.define("attendance", {
    id : {
        type : DataTypes.INTEGER,
        allowNull :  false,
        autoIncrement : true,
        primaryKey: true
    },

    date : {
        type : DataTypes.STRING,
        allowNull :  false
    },

    attendance : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
    },

    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Attendance;