const { DataTypes } = require('sequelize');

module.exports = function(sequelize){
    return sequelize.define('Temperament',{
        Id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{timestamps: false});
};