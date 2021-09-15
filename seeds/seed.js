const sequelize = require('../config/connection');
const { User, Nanny, Rating } = require('../models');

const userData = require('./userData.json');
const nannyData = require('./nannyData.json');
const ratingData= require('./ratingData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const nanny = await Nanny.bulkCreate(nannyData, {
    // individualHooks: true,
    returning: true,
  });
  const rating = await Rating.bulkCreate(ratingData, {
    // individualHooks: true,
    returning: true,
  });
///this did not push correclty

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
