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

//rating has the foreign key called parent id
Rating.hasOne(User,{
  //alias that names the relationship
  as:'parent',
  foreignKey: 'id',
  sourceKey:'parent_id',
  //this prevents the cyclic reference we were running into
  constraints:false
})


module.exports = { Rating, User };
