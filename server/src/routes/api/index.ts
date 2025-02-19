import { Router } from 'express';
import userRoutes from './user-routes.js';
import postRoutes from './post-routes.js';
import profileRoutes from './profile-routes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/profile', profileRoutes);

export default router;