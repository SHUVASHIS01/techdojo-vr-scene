import express from 'express';
import Scene from '../models/Scene.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

// POST /api/scene/save
router.post('/save', requireAuth, async (req, res) => {
  try {
    const { objects } = req.body;
    
    await Scene.findOneAndUpdate(
      { userId: req.session.userId },
      { userId: req.session.userId, objects, updatedAt: Date.now() },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: 'Scene saved' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save scene', error: error.message });
  }
});

// GET /api/scene/load
router.get('/load', requireAuth, async (req, res) => {
  try {
    const scene = await Scene.findOne({ userId: req.session.userId });
    if (!scene) {
      return res.json({ objects: [] });
    }
    res.json({ objects: scene.objects });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load scene', error: error.message });
  }
});

export default router;
