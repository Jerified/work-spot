import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getSpaces,
  createSpace,
  updateSpace,
  deleteSpace
} from '../controllers/spaceController.js';

const router = express.Router();

router.get('/', getSpaces);

// Admin routes
router.post('/', protect, admin, createSpace);
router.put('/:id', protect, admin, updateSpace);
router.delete('/:id', protect, admin, deleteSpace);

export default router; 