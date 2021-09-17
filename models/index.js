const User = require('./User');
const Rating = require('./Rating');

//SOMEONE PLEASE REVIEW THESE AND CONFRIM

//one to many 
User.belongsTo(Rating,{
  foreignKey: 'nanny_id'
})

//rating has the foreign key called parent id
Rating.hasOne(User,{
  foreignKey: 'parent_id'
})


module.exports = { Rating, User };
