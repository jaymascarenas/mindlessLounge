import { Router, Request, Response } from 'express';
import { User, Post } from '../../models/index.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

// GET /api/posts - Get all posts
router.get('/', async (_req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['username']
      }],
      order: [['createdAt', 'DESC']]
    });

    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

// POST /api/posts - Create a new post
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const username = req.user?.username;

    if (!username) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const post = await Post.create({
      content,
      userId: user.id
    });

    const postWithUser = await Post.findByPk(post.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['username']
      }]
    });

    return res.json(postWithUser);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

// PUT /api/posts/:id - Update a post
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const username = req.user?.username;
    if (!username) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.userId !== user.id) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const { content } = req.body;
    await post.update({ content });

    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

// DELETE /api/posts/:id - Delete a post
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const username = req.user?.username;
    if (!username) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.userId !== user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.destroy();
    return res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err });
  }
});

export default router;