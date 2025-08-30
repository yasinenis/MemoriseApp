export async function getIndexPage(req, res) {
  res.status(200).render('index');
}

export async function getWordsPage(req, res) {
  const words = await Word.find().sort('-createdAt');
  try {
    res.status(200).render('words', {
      words,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function getRegisterPage(req, res) {
  res.status(200).render('register');
}
