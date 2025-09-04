const wordCardDOM = document.querySelector('.word-card-in');
const frontWordDOM = document.querySelector('.word-front');
const backWordDOM = document.querySelector('.word-back');

wordCardDOM.addEventListener('click', touchHandler);

function touchHandler() {
  frontWordDOM.classList.toggle('d-none');
  backWordDOM.classList.toggle('d-none');
}

// next word----------------------------------------------------

const categoryIconDOM = document.getElementById('category-icon');
const categoryDOM = document.getElementById('category');
const wordDOM = document.getElementById('word');
const meaningDOM = document.getElementById('meaning');
const rememberedBtnDOM = document.getElementById('rememberedBtn');
const forgotBtnDOM = document.getElementById('forgotBtn');
const addWordsBtnDOM = document.getElementById('addWordsBtn');
const refreshBtnDOM = document.getElementById('refreshBtn');

let currentIndex = 0;

let wordsNeedStudy = [];
fetchWords();

async function showWord(index) {
  let word = wordsNeedStudy[index];
  if (!word) {
    await refreshWords();
    word = wordsNeedStudy[currentIndex];
    if (!word) {
      categoryDOM.innerText = '';
      wordDOM.innerText = 'All ╰(*°▽°*)╯ Done !';
      meaningDOM.innerText = "Words will be here (●'◡'●) soon.";
      noWords();
      return;
    }
  }
  categoryDOM.innerText = word.category.name;
  wordDOM.innerText = word.word;
  meaningDOM.innerText = word.meaning;
  forgotBtnDOM.href = 'learn/forgot/' + wordsNeedStudy[index]._id;
  yesWords();
}

async function fetchWords() {
  try {
    const res = await fetch('/learn/fetch-words');
    if (res.ok) {
      const fetchedWords = await res.json();
      wordsNeedStudy.length = 0;
      wordsNeedStudy.push(...fetchedWords);
      currentIndex = 0;
      showWord(currentIndex);
    } else {
      console.error('Fetch failed:', res.status);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

async function refreshWords() {
  try {
    const res = await fetch('/learn/fetch-words');
    if (res.ok) {
      const fetchedWords = await res.json();
      if (fetchedWords.length <= 0) {
        return;
      }
      wordsNeedStudy.length = 0;
      wordsNeedStudy.push(...fetchedWords);
      currentIndex = 0;
      showWord(currentIndex);
    } else {
      console.error('Fetch failed:', res.status);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

function noWords() {
  addWordsBtnDOM.classList.remove('d-none'); // görün
  refreshBtnDOM.classList.remove('d-none');
  forgotBtnDOM.classList.add('d-none');
  rememberedBtnDOM.classList.add('d-none');
  categoryIconDOM.classList.add('d-none');
  categoryDOM.classList.add('d-none');
}

function yesWords() {
  addWordsBtnDOM.classList.add('d-none');
  refreshBtnDOM.classList.add('d-none');
  forgotBtnDOM.classList.remove('d-none');
  rememberedBtnDOM.classList.remove('d-none');
  categoryIconDOM.classList.remove('d-none');
  categoryDOM.classList.remove('d-none');
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

forgotBtnDOM.addEventListener('click', async function (e) {
  e.preventDefault();

  const id = wordsNeedStudy[currentIndex]._id;

  try {
    const res = await fetch('/learn/forgot/' + id);
    if (res.ok) {
      // process increases
      currentIndex++;

      showWord(currentIndex); // bir sonraki kelime
    }
  } catch (err) {
    console.error(err);
  }
});

window.onload = async () => {
  await fetchWords();
};
