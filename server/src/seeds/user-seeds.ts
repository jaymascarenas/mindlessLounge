import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: 'JollyGuru', email: 'jolly@guru.com', password: 'password', profilePicture: 'default.jpg' },
      {
        username: 'SunnyScribe',
        email: 'sunny@scribe.com',
        password: 'password',
        profilePicture: 'default.jpg',
      },
      {
        username: 'RadiantComet',
        email: 'radiant@comet.com',
        password: 'password',
        profilePicture: 'default.jpg',
      },
    ],
    { individualHooks: true }
  );
};
