import { Router } from 'express';
import { Profile, User } from '../../models';
import auth from '../../middleware/auth';

const router = Router();

// GET /api/profile - Get current user's profile
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.session.userId },
      include: [{ model: User, as: 'user', attributes: ['username', 'email'] }]
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// POST /api/profile - Create or update user profile
router.post('/', auth, async (req, res) => {
  try {
    const { bio, profilePicture, interests } = req.body;

    const [profile, created] = await Profile.findOrCreate({
      where: { userId: req.session.userId },
      defaults: {
        bio: bio || '',
        profilePicture: profilePicture || null,
        interests: interests || [],
        userId: req.session.userId
      }
    });

    if (!created) {
      // Update existing profile
      await profile.update({
        bio: bio || profile.bio,
        profilePicture: profilePicture || profile.profilePicture,
        interests: interests || profile.interests
      });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// GET /api/profile/:username - Get profile by username
router.get('/:username', async (req, res) => {
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

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// DELETE /api/profile - Delete user profile
router.delete('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.session.userId }
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    await profile.destroy();
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

export default router;