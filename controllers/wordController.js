import Word from '../models/Word.js';
import Category from '../models/Category.js';

export async function getWordsPage(req, res) {
  try {
    // query
    const query = req.query.searchWord;
    // query--
    // filter
    const categorySlug = req.query.categories;
    let category = null;
    if (categorySlug) {
      category = await Category.findOne({
        slug: categorySlug,
        user: req.session.userID,
      });
    }

    let filter = { user: req.session.userID };

    if (categorySlug && category) {
      filter.category = category._id;
    }
    // filter end

    // ..query
    if (query && query.trim() !== '') {
      filter.word = { $regex: query, $options: 'i' };
    }
    // query- end

    const words = await Word.find(filter)
      .sort('-createdAt')
      .populate('category');
    const categories = await Category.find({ user: req.session.userID }).sort(
      '-createdAt'
    );

    // No Category Creation
    if (req.session.userID) {
      let noCategory = await Category.findOne({
        user: req.session.userID,
        name: 'Uncategorized',
      });

      if (!noCategory) {
        noCategory = await Category.create({
          user: req.session.userID,
          name: 'Uncategorized',
        });
        categories.push(noCategory);
      }
      // No Category END
    }

    res.status(200).render('words', {
      words,
      categories,
      searchQuery: query,
      categorySlug,
      pageName: 'words',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err.message,
    });
  }
}

export async function createWord(req, res) {
  const category = await Category.findOne({
    _id: req.body.category,
    user: req.session.userID,
  });

  const word = await Word.create({
    word: req.body.word,
    meaning: req.body.meaning,
    partOfSpeech: req.body.partOfSpeech,
    phonetics: req.body.phonetics,
    sentence: req.body.sentence,
    category: category.id,
    user: req.session.userID,
  });

  try {
    res.status(201).redirect('/words');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function deleteWord(req, res) {
  try {
    const word = await Word.findOneAndDelete({
      _id: req.params.id,
      user: req.session.userID,
    });

    if (!word) {
      return res
        .status(403)
        .json({ error: 'Not authorized or word not found' });
    }

    res.status(201).redirect('/words');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function editWord(req, res) {
  try {
    const word = await Word.findOne({
      _id: req.params.id,
      user: req.session.userID,
    });

    if (!word) {
      return res
        .status(403)
        .json({ error: 'Not authorized or word not found' });
    }

    word.word = req.body.word;
    word.meaning = req.body.meaning;
    word.partOfSpeech = req.body.partOfSpeech;
    word.phonetics = req.body.phonetics;
    word.sentence = req.body.sentence;
    word.category = req.body.category;
    await word.save();
    res.status(201).redirect('/words');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
}
