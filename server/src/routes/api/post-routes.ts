import { Router } from 'express';
import { Post, User, Profile } from '../../models';
import auth from '../../middleware/auth';

const router = Router();

// GET /api/posts - Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['username'],
        include: [{
          model: Profile,
          as: 'profile',
          attributes: ['profilePicture']
        }]
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// POST /api/posts - Create a new post
router.post('/', auth, async (req, res) => {
  try {
    const { content, mediaUrl } = req.body;

    const post = await Post.create({
      content,
      mediaUrl,
      userId: req.session.userId
    });

    // Fetch the created post with user info
    const postWithUser = await Post.findByPk(post.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['username'],
        include: [{
          model: Profile,
          as: 'profile',
          attributes: ['profilePicture']
        }]
      }]
    });

    res.json(postWithUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// GET /api/posts/:id - Get a specific post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['username'],
        include: [{
          model: Profile,
          as: 'profile',
          attributes: ['profilePicture']
        }]
      }]
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// PUT /api/posts/:id - Update a post
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.userId !== req.session.userId) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const { content, mediaUrl } = req.body;
    await post.update({
      content: content || post.content,
      mediaUrl: mediaUrl || post.mediaUrl
    });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// DELETE /api/posts/:id - Delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.userId !== req.session.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.destroy();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

export default router;