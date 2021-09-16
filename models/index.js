const User = require('./User');
const Rating = require('./Rating');

//SOMEONE PLEASE REVIEW THESE AND CONFRIM

//one to many 
// User.belongsTo(Rating,{
//   foreignKey: 'nanny_id'
// })
//
User.hasMany(Rating,{
  foreignKey: 'nanny_id'
})

// User.belongsTo(Rating,{
//   foreignKey:'parent_id'
// })

//rating has the foreign key called parent id
// Rating.hasOne(User,{
//   foreignKey: 'parent_id'
// })


module.exports = { Rating, User };
