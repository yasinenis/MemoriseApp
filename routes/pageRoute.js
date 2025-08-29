import express from 'express';

import * as pageController from '../controllers/pageController.js';

const router = express.Router();

router.route('/').get(pageController.getIndexPage); // localhost:3000/

export default router;
