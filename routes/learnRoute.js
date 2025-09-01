import express from 'express';

import * as learnController from '../controllers/learnController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(authMiddleware, learnController.getLearnPage); // localhost:3000/

export default router;
