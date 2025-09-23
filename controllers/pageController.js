export async function getIndexPage(req, res) {
  res.status(200).render('index', { pageName: 'home' });
}

export async function getRegisterPage(req, res) {
  res.status(200).render('register', { pageName: 'register' });
}

export async function getLoginPage(req, res) {
  res.status(200).render('login', { pageName: 'login' });
}

export async function getContactPage(req, res) {
  res.status(200).render('contact', { pageName: 'contact' });
}
