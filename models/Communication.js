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
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'user',
        key:'id'
      }
    },
    receiver_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'user',
        key:'id'
      },
    },
    sender_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message:{
      type:DataTypes.TEXT,
      allowNull:true,
    }
    },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'communication',
  }
);
module.exports = Communication;
