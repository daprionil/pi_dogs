const {v4:uuidv4} = require('uuid');
const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      set(){
        this.setDataValue('id',uuidv4());
      }
    },
    image:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        isUrl:true
      }
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
        this.setDataValue('height',`${value}cm`);
      }
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
        this.setDataValue('weight',`${value}lb`);
      }
    },
    yearsOld:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    db:{
      type: Sequelize.VIRTUAL,
      get(){
        return true
      }
    }
  },{timestamps: false});
};
