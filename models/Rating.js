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
    rating:{
      type: DataTypes.INTEGER,
      allowNull: true,
      validate:{
        min:1,
        max:5
      }
    },
    //OPTION for user to leave comments as well as a rating between 1-5
    review:{
      type:DataTypes.STRING,
      allowNull:true,
      validate:{
        isAlphanumeric: true,
        len:[10]
      }
    }
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
