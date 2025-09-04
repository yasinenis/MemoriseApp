const wordCardDOM = document.querySelector('.word-card-in');
const frontWordDOM = document.querySelector('.word-front');
const backWordDOM = document.querySelector('.word-back');

wordCardDOM.addEventListener('click', touchHandler);

function touchHandler() {
  frontWordDOM.classList.toggle('d-none');
  backWordDOM.classList.toggle('d-none');
}

// next word

const categoryIconDOM = document.getElementById('category-icon');
const categoryDOM = document.getElementById('category');
const wordDOM = document.getElementById('word');
const meaningDOM = document.getElementById('meaning');
const rememberedBtnDOM = document.getElementById('rememberedBtn');
const forgotBtnDOM = document.getElementById('forgotBtn');
const addWordsBtnDOM = document.getElementById('addWordsBtn');

// JSON'u div içinden al
const wordsDataDiv = document.getElementById('words-data');
const wordsNeedStudy = JSON.parse(wordsDataDiv.dataset.words);

let currentIndex = 0;

function showWord(index) {
  const word = wordsNeedStudy[index];
  let countWord = wordsNeedStudy.length;
  if (!word) {
    categoryIconDOM.classList.toggle('d-none');
    categoryDOM.innerText = '';
    categoryDOM.classList.toggle('d-none');
    wordDOM.innerText = 'All ╰(*°▽°*)╯ Done !';
    meaningDOM.innerText = "Words will be here (●'◡'●) soon.";
    addWordsBtnDOM.classList.toggle('d-none');
    forgotBtnDOM.classList.toggle('d-none');
    rememberedBtnDOM.classList.toggle('d-none');
    return;
  }
  categoryDOM.innerText = word.category.name || '';
  wordDOM.innerText = word.word;
  meaningDOM.innerText = word.meaning;
  forgotBtnDOM.href = 'learn/forgot/' + wordsNeedStudy[index]._id;
}

rememberedBtnDOM.addEventListener('click', async function (e) {
  e.preventDefault();

  const id = wordsNeedStudy[currentIndex]._id;

  try {
    const res = await fetch('/learn/remembered/' + id);
    if (res.ok) {
      // process increases
      wordsNeedStudy.splice(currentIndex, 1);

      showWord(currentIndex); // bir sonraki kelime
    }
  } catch (err) {
    console.error(err);
  }
});

function nextWord() {
  currentIndex++;
  showWord(currentIndex);
}

window.onload = () => showWord(currentIndex);
