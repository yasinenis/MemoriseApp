import express from 'express';

import * as wordController from '../controllers/wordController.js';
import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

router.route('/').get(wordController.getWordsPage); // localhost:3000/words
router.route('/addWord').post(wordController.createWord);
router.route('/delete/:id').get(wordController.deleteWord);
router.route('/editWord/:id').put(wordController.editWord);

router.route('/category').get(categoryController.createCategory);

export default router;
