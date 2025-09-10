import express from 'express';

import * as writeController from '../controllers/writeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(authMiddleware, writeController.getWritePage); // localhost:3000/write

export default router;
