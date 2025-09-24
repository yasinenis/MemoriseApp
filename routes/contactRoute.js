import express from 'express';

import * as contactController from '../controllers/contactController.js';

const router = express.Router();

router.route('/contact-mail').post(contactController.sendMail); // localhost:3000/learn

export default router;
