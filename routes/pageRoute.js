import express from 'express';

import * as pageController from '../controllers/pageController.js';
import redirectMiddleware from '../middlewares/redirectMiddleware.js';

const router = express.Router();

router.route('/').get(pageController.getIndexPage); // localhost:3000/
router
  .route('/register')
  .get(redirectMiddleware, pageController.getRegisterPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);
router.route('/contact').get(pageController.getContactPage);

export default router;
