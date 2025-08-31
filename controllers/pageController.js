export async function getIndexPage(req, res) {
  res.status(200).render('index');
}

export async function getRegisterPage(req, res) {
  res.status(200).render('register');
}

export async function getLoginPage(req, res) {
  res.status(200).render('login');
}
