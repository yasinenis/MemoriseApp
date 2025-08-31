import express from 'express';

import * as authController from '../controllers/authController.js';

const router = express.Router();

router.route('/signup').post(authController.createUser); // localhost:3000/words
router.route('/login').post(authController.loginUser); // localhost:3000/words
router.route('/logout').get(authController.logoutUser);

export default router;
