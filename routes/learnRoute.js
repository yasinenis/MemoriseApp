import express from 'express';

import * as learnController from '../controllers/learnController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(authMiddleware, learnController.getLearnPage); // localhost:3000/learn
router
  .route('/remembered/:id')
  .get(authMiddleware, learnController.rememberedWord);
router.route('/forgot/:id').get(authMiddleware, learnController.forgotWord);
router.route('/fetch-words').get(learnController.getWordsNeedLearn);
router.route('/isThereEvenOneWord').get(learnController.isThereEvenOneWord);
export default router;
