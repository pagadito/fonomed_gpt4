const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MedicalHistory = sequelize.define('MedicalHistory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    diagnosis: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    treatment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = MedicalHistory;
