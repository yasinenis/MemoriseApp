export async function contactFunction(req, res) {
  try {
    console.log('hmm');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}
