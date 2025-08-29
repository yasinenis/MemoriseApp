import express from 'express';

import * as wordController from '../controllers/wordController.js';

const router = express.Router();

router.route('/').get(wordController.getWordsPage); // localhost:3000/words
router.route('/addWord').post(wordController.createWord); // localhost:3000/words

export default router;
