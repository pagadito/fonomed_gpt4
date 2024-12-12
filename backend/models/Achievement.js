const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Achievement = sequelize.define('Achievement', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    points: { type: DataTypes.INTEGER, defaultValue: 0 },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Achievement;
