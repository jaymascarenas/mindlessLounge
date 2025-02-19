import { Router, Request, Response } from 'express';
import { User, Profile } from '../../models/index.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

// GET /api/profile - Get current user's profile
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const username = req.user?.username;
    if (!username) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = await Profile.findOne({
      where: { userId: user.id },
      include: [{ model: User, as: 'user', attributes: ['username', 'email'] }]
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

// POST /api/profile - Create or update user profile
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const username = req.user?.username;
    if (!username) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { bio } = req.body;

    const [profile, created] = await Profile.findOrCreate({
      where: { userId: user.id },
      defaults: {
        bio: bio || '',
        userId: user.id
      }
    });

    if (!created) {
      await profile.update({
        bio: bio || profile.bio
      });
    }

    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

// GET /api/profile/:username - Get profile by username
router.get('/:username', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
      attributes: ['id', 'username', 'email']
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = await Profile.findOne({
      where: { userId: user.id },
      include: [{ model: User, as: 'user', attributes: ['username', 'email'] }]
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.json(profile);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

export default router;