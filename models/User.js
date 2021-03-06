const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { capitalLetter } = require('../utils/helpers');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    user_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["parent", "nanny"]]
      }
    },
    photo: {
      type: DataTypes.STRING,
      //default this to the blank image in images file
      allowNull: false,
      defaultValue: `https://nanny-app-photo.s3.us-east-2.amazonaws.com/b9769525-4c4a-476f-b8de-259e73add161.jpeg`
    },
    nanny_age: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate:{
      //   isIn:[["18-21", "22-25","26 +"]]
      // }
    },
    age_range: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    number_of_children: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hourly_rate: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate:{
      //   isDecimal:true
      // }
    },
    experience_years: {
      type: DataTypes.STRING,
      allowNull: true
    },
    certification: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        newUserData.name = await capitalLetter(newUserData.name)
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        updatedUserData.name = await capitalLetter(updatedUserData.name)
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
