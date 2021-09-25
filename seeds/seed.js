const sequelize = require('../config/connection');
const { User, Rating, Communication } = require('../models');

const userData = require('./userData.json');
const ratingData= require('./ratingData.json');
const communicationData = require('./communicationData.json');

const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

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

//potentially do this to give the nannies ratings from the start
  // for (const project of projectData) {
  //   await Project.create({
  //     ...project,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
