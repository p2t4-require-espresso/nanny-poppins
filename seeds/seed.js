const sequelize = require('../config/connection');
const { User, Rating, Communication } = require('../models');

const userData = require('./userData.json');
const ratingData= require('./ratingData.json');
const communicationData = require('./communicationData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const rating = await Rating.bulkCreate(ratingData, {
    // individualHooks: true,
    returning: true,
  });

  const communication = await Communication.bulkCreate(communicationData,{
    returning: true,
  })

  process.exit(0);
};

seedDatabase();
