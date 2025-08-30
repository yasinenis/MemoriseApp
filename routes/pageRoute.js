import express from 'express';

import * as pageController from '../controllers/pageController.js';

const router = express.Router();

router.route('/').get(pageController.getIndexPage); // localhost:3000/
router.route('/register').get(pageController.getRegisterPage);

export default router;
