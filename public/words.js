const wordEditHeadBtnDOM = document.querySelector('.wordEditHeadBtn');

const wordEditBtnDOM = document.querySelectorAll('.wordEditBtn');
const wordDeleteBtnDOM = document.querySelectorAll('.wordDeleteBtn');

wordEditHeadBtnDOM.addEventListener('click', touchHandlerWord);

function touchHandlerWord() {
  wordEditBtnDOM.forEach((btn) => btn.classList.toggle('d-none'));
  wordDeleteBtnDOM.forEach((btn) => btn.classList.toggle('d-none'));
}

/* categories */
const categoryEditHeadBtnDOM = document.querySelector('.categoryEditHeadBtn');

const categoryEditBtnDOM = document.querySelectorAll('.categoryEditBtn');
const categoryDeleteBtnDOM = document.querySelectorAll('.categoryDeleteBtn');

categoryEditHeadBtnDOM.addEventListener('click', touchHandlerCategory);

function touchHandlerCategory() {
  categoryEditBtnDOM.forEach((btn) => btn.classList.toggle('d-none'));
  categoryDeleteBtnDOM.forEach((btn) => btn.classList.toggle('d-none'));
}
