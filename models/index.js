const User = require('./User');
const Coffeebean = require('./Coffeebean');
const Roastery = require('./Roaster');

//one to many 
Roastery.hasMany(Coffeebean, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
//many to one
Coffeebean.hasMany(Roastery, {
  foreignKey: 'roastery_id'
});

module.exports = { Coffeebean, Roastery };
