import { Router, Request, Response } from 'express';
import { User, Profile } from '../../models/index.js';
import { authenticateToken } from '../../middleware/auth.js';
import jwt from 'jsonwebtoken';
import { getProfilePictures } from '../../controllers/profileController.js';

const router = Router();

router.get('/profile-pictures', getProfilePictures);

// POST /api/users/register - Register a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password, profilePicture } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({
      where: {
        username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const existingEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create the user
    const user = await User.create({
      username,
      email,
      password,
      profilePicture: profilePicture || 'https://i.imgur.com/SI1jDAi.jpg', // Default to Chill Mind
    });

    // Create an empty profile for the user
    await Profile.create({
      userId: user.id,
      bio: '',
    });

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET_KEY || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Don't send password in response
    const userWithoutPassword = {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      token,
    };

    return res.status(201).json(userWithoutPassword);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

// POST /api/users/login - Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await user.checkPassword(password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        username: user.username,
        profilePicture: user.profilePicture  // Add profile picture to token
      },
      process.env.JWT_SECRET_KEY || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Don't send password in response
    const userWithoutPassword = {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      token,
    };

    return res.json(userWithoutPassword);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

// GET /api/users/me - Get current user's info
router.get('/me', authenticateToken, async (req: Request, res: Response) => {
  try {
    const username = req.user?.username;
    if (!username) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findOne({
      where: { username },
      attributes: ['id', 'username', 'email', 'profilePicture'],
      include: [{
        model: Profile,
        as: 'profile',
      }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

// PUT /api/users/me - Update current user's info
router.put('/me', authenticateToken, async (req: Request, res: Response) => {
  try {
    const username = req.user?.username;
    if (!username) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { email, password, profilePicture } = req.body;

    if (email) {
      // Check if new email already exists
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail && existingEmail.id !== user.id) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      user.email = email;
    }

    if (password) {
      await user.setPassword(password);
    }

    if (profilePicture) {
      user.profilePicture = profilePicture;
    }

    await user.save();

    // Don't send password in response
    const userWithoutPassword = {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
    };

    return res.json(userWithoutPassword);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

// DELETE /api/users/me - Delete current user
router.delete('/me', authenticateToken, async (req: Request, res: Response) => {
  try {
    const username = req.user?.username;
    if (!username) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

export default router;