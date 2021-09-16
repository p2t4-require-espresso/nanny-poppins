const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rating extends Model {}

Rating.init(
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
    stars:{
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:1,
        max:5
      }
    },
    review:{
      type:DataTypes.TEXT,
      allowNull:true,
    }
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'rating',
  }
);
module.exports = Rating;
