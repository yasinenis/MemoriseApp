import express from 'express';

import * as authController from '../controllers/authController.js';

const router = express.Router();

router.route('/words').get(authController.getWordsPage);

export default router;
