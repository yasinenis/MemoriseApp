const wordCardDOM = document.querySelector('.word-card-in');
const frontWordDOM = document.querySelector('.word-front');
const backWordDOM = document.querySelector('.word-back');

wordCardDOM.addEventListener('click', touchHandler);

function touchHandler() {
  frontWordDOM.classList.toggle('d-none');
  backWordDOM.classList.toggle('d-none');
}
