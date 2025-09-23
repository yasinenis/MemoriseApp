import express from 'express';

import * as contactController from '../controllers/contactController.js';

const router = express.Router();

router.route('/').get(contactController.contactFunction); // localhost:3000/learn

export default router;
