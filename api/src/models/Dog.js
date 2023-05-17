const { DataTypes, Op } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    image:{
      type: DataTypes.TEXT,
      allowNull: false,
      isUrl:true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
        this.setDataValue('height',`${value}mts`);
      }
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
        this.setDataValue('weight',`${value}kg`);
      }
    },
    yearsOld:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
};
