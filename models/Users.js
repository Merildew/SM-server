const sequelize = require("../config/config");
const {DataTypes} = require('sequelize');

const Users = sequelize.define('users', {
    userid: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    pass: {
        type: DataTypes.STRING,
    }
});

module.exports = Users;