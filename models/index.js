const User = require('./User');
const Rating = require('./Rating');
const Nanny = require('./Nanny');


//SOMEONE PLEASE REVIEW THESE AND CONFRIM

//one to many 
Nanny.belongsto(User, {
  foreignKey: 'user_id',
});
// one to many
User.hasMany(Nanny, {
  foreignKey: 'user_id'
});
//one to many
Nanny.hasMany(Rating,{
  foreignKey:'rating_id'
})
//many to one
Rating.belongsto(User,{
  foreignKey:'user_id'
})
//many to one
Rating.belongto(Nanny,{
  foreignKey:'nanny_id'
})
//one to many
User.hasMany(Rating,{
  foreignKey:'user_id'
})

module.exports = { Nanny, Rating, User };
