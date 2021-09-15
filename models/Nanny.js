const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Nanny extends Model {}

Nanny.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hourly_rate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: email
        }
    },
    experience_years: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references : {
            model: "user",
            key: "id"
        },
    },
    rating_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'rating',
            key:'id'
        }
    },
sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = Nanny;