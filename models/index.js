const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');

Posts.hasMany(Comments, {
  foreignKey: 'post_id',
});

Comments.belongsTo(Posts, {
  foreignKey: 'post_id',
});

module.exports = { User, Posts, Comments };
