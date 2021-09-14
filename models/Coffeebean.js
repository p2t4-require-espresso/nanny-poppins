const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

Coffeebean.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roast: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    flavor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    roastery_id: {
        type: DataTypes.INTEGER,
        references : {
            model: "roastery",
            key: "id"
        },
    },
sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = Coffebean;