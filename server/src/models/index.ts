import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { PostFactory } from './post.js';
import { ProfileFactory } from './profile.js';

const User = UserFactory(sequelize);
const Post = PostFactory(sequelize);
const Profile = ProfileFactory(sequelize);

// Define relationships
User.hasMany(Post, {
  foreignKey: 'userId',
  as: 'posts',
});
Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.hasOne(Profile, {
  foreignKey: 'userId',
  as: 'profile',
});
Profile.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export { User, Post, Profile };