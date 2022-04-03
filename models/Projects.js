const sequelize = require("../config/config");
const { DataTypes } = require("sequelize");

const Projects = sequelize.define("projects", {
  projectid: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  src: {
    type: DataTypes.TEXT,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Projects;
