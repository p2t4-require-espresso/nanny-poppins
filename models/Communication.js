const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Communication extends Model {}

Communication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nanny_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refernces:{
        model:'user',
        key:'id'
      }
    },
    parent_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      refernces:{
        model:'user',
        key:'id'
      },
    },
    message:{
      type:DataTypes.TEXT,
      allowNull:true,
    }
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'communication',
  }
);
module.exports = Communication;
