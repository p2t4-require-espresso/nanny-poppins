const User = require('./User');
const Rating = require('./Rating');
const Communication = require('./Communication');

//SOMEONE PLEASE REVIEW THESE AND CONFRIM

//one to many 
User.belongsTo(Rating, {
  foreignKey: 'nanny_id'
})

//rating has the foreign key called parent id
Rating.hasOne(User, {
  as: 'parent',
  foreignKey: 'id',
  sourceKey: 'parent_id',
  //this prevents the cyclic reference we were running into
  constraints: false
})

User.belongsTo(Communication, {
  as: 'parent',
  foreignKey: 'parent_id'
})

User.belongsTo(Communication, {
 as: 'nanny',
   foreignKey: 'nanny_id'
 })

//User.hasMany(Communication, {as:'user', constraints: false,})

module.exports = { Rating, User, Communication };
