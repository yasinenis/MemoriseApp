const wordCardDOM = document.querySelector('.word-card-in');
const frontWordDOM = document.querySelector('.word-front');
const backWordDOM = document.querySelector('.word-back');
const wordCardAllDOM = document.querySelector('.word-card');

wordCardDOM.addEventListener('click', touchHandler);

function touchHandler() {
  frontWordDOM.classList.toggle('d-none');
  backWordDOM.classList.toggle('d-none');
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowUp') {
    e.preventDefault(); // Prevent scrolling when space is pressed
    frontWordDOM.classList.add('d-none');
    backWordDOM.classList.remove('d-none');
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    frontWordDOM.classList.remove('d-none');
    backWordDOM.classList.add('d-none');
  }
});

// next word----------------------------------------------------

const categoryIconDOM = document.getElementById('category-icon');
const categoryDOM = document.getElementById('category');
const wordDOM = document.getElementById('word');
const meaningDOM = document.getElementById('meaning');
const rememberedBtnDOM = document.getElementById('rememberedBtn');
const forgotBtnDOM = document.getElementById('forgotBtn');
const addWordsBtnDOM = document.getElementById('addWordsBtn');
const progressIconDOM = document.getElementById('progress-icon');
const progressDOM = document.getElementById('progress');
const phoneticDOM = document.getElementById('phonetic');

startPage();
isThereEvenOneWord();

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
      phoneticDOM.innerText = '';
      meaningDOM.innerText = "Words will be here (●'◡'●) soon.";
      noWords();
      return;
    }
  }

  frontWordDOM.classList.remove('d-none');
  backWordDOM.classList.add('d-none');
  categoryDOM.innerText = word.category.name;
  wordDOM.innerText = word.word;
  phoneticDOM.innerText = word.phonetics ? `/${word.phonetics}/` : '';
  meaningDOM.innerText = word.meaning;
  forgotBtnDOM.href = 'learn/forgot/' + wordsNeedStudy[index]._id;

  const progressMap = {
    12: {
      className: 'color-remembered',
      text: 'Re-learn',
      iconClass: 'fa-solid',
      iconClass2: 'fa-circle',
    },
    0: {
      text: 'New',
      className: 'color-new',
      iconClass: 'fa-solid',
      iconClass2: 'fa-circle',
    },
    1: {
      text: 'Learner 1',
      className: 'color-remembered',
      iconClass: 'fa-solid',
      iconClass2: 'fa-circle',
    },
    2: {
      text: 'Learner 2',
      className: 'color-remembered',
      iconClass: 'fa-solid',
      iconClass2: 'fa-circle',
    },
    3: {
      text: 'Learner 3',
      className: 'color-remembered',
      iconClass: 'fa-solid',
      iconClass2: 'fa-circle',
    },
    4: {
      text: 'Learner 4',
      className: 'color-remembered',
      iconClass: 'fa-solid',
      iconClass2: 'fa-circle',
    },
    5: {
      text: 'Mastered 1',
      className: 'color-mastered',
      iconClass: 'fa-solid',
      iconClass2: 'fa-circle',
    },
    6: {
      text: 'Mastered 2',
      className: 'color-mastered',
      iconClass: 'fa-solid',
      iconClass2: 'fa-circle',
    },
    7: {
      text: 'Mastered 3',
      className: 'color-mastered',
      iconClass: 'fa-solid',
      iconClass2: 'fa-circle',
    },
    8: {
      text: 'Mastered 4',
      className: 'color-mastered',
      iconClass: 'fa-solid',
      iconClass2: 'fa-circle',
    },
    9: {
      text: 'Mastered 5',
      className: 'color-mastered',
      iconClass: 'fa-solid',
      iconClass2: 'fa-circle',
    },
    10: {
      text: 'Expert',
      className: 'color-mastered',
      iconClass: 'fa-solid',
      iconClass2: 'fa-circle',
    },
  };

  if (word.progress === 0 && word.newAdded === false) {
    word.progress = 12;
  }

  const progressInfo = progressMap[word.progress];

  if (progressInfo) {
    progressDOM.innerText = ` ${progressInfo.text}`;
    progressDOM.className = '';
    progressIconDOM.className = '';
    progressDOM.classList.add(progressInfo.className);
    progressIconDOM.classList.add(progressInfo.className);
    progressIconDOM.classList.add(progressInfo.iconClass);
    progressIconDOM.classList.add(progressInfo.iconClass2);
  }

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
  phoneticDOM.classList.add('d-none');
  addWordsBtnDOM.classList.remove('d-none'); // görün
  forgotBtnDOM.classList.add('d-none');
  rememberedBtnDOM.classList.add('d-none');
  categoryIconDOM.classList.add('d-none');
  categoryDOM.classList.add('d-none');
  progressIconDOM.classList.add('d-none');
  progressDOM.classList.add('d-none');
}

function yesWords() {
  phoneticDOM.classList.remove('d-none');
  addWordsBtnDOM.classList.add('d-none');
  forgotBtnDOM.classList.remove('d-none');
  rememberedBtnDOM.classList.remove('d-none');
  categoryIconDOM.classList.remove('d-none');
  categoryDOM.classList.remove('d-none');
  progressIconDOM.classList.remove('d-none');
  progressDOM.classList.remove('d-none');
}

function startPage() {
  phoneticDOM.classList.add('d-none');
  addWordsBtnDOM.classList.add('d-none');
  forgotBtnDOM.classList.add('d-none');
  rememberedBtnDOM.classList.add('d-none');
  categoryIconDOM.classList.add('d-none');
  categoryDOM.classList.add('d-none');
  progressIconDOM.classList.add('d-none');
  progressDOM.classList.add('d-none');
}

// remember word----------------------------------------------------
async function rememberCurrentWord() {
  const id = wordsNeedStudy[currentIndex]._id;

  try {
    const res = await fetch('/learn/remembered/' + id);
    if (res.ok) {
      // process increases
      wordsNeedStudy.splice(currentIndex, 1);
      showWord(currentIndex); // next word
    }
  } catch (err) {
    console.error(err);
  }
}

rememberedBtnDOM.addEventListener('click', async function (e) {
  e.preventDefault();

  // animation
  rememberedBtnDOM.classList.add('pressed-remember');
  wordCardAllDOM.classList.add('slide-right');
  setTimeout(() => {
    rememberedBtnDOM.classList.remove('pressed-remember');
    wordCardAllDOM.classList.remove('slide-right');
  }, 600);

  // next word
  setTimeout(() => {
    rememberCurrentWord();
  }, 600);
});

document.addEventListener('keydown', async function (e) {
  if (e.key === 'ArrowRight' && wordsNeedStudy.length > 0) {
    e.preventDefault();

    // animation
    rememberedBtnDOM.classList.add('pressed-remember');
    wordCardAllDOM.classList.add('slide-right');
    setTimeout(() => {
      rememberedBtnDOM.classList.remove('pressed-remember');
      wordCardAllDOM.classList.remove('slide-right');
    }, 600);

    // next word
    setTimeout(() => {
      rememberCurrentWord();
    }, 600);
  }
});

// forget word----------------------------------------------------
async function forgetCurrentWord() {
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
}

forgotBtnDOM.addEventListener('click', async function (e) {
  e.preventDefault();

  // animation
  forgotBtnDOM.classList.add('pressed-forgot');
  wordCardAllDOM.classList.add('slide-left');
  setTimeout(() => {
    forgotBtnDOM.classList.remove('pressed-forgot');
    wordCardAllDOM.classList.remove('slide-left');
  }, 600);
  // next word
  setTimeout(() => {
    forgetCurrentWord();
  }, 600);
});

document.addEventListener('keydown', async function (e) {
  if (e.key === 'ArrowLeft' && wordsNeedStudy.length > 0) {
    e.preventDefault();

    // animation
    forgotBtnDOM.classList.add('pressed-forgot');
    wordCardAllDOM.classList.add('slide-left');
    setTimeout(() => {
      forgotBtnDOM.classList.remove('pressed-forgot');
      wordCardAllDOM.classList.remove('slide-left');
    }, 600);

    // next word
    setTimeout(() => {
      forgetCurrentWord();
    }, 600);
  }
});

// first load----------------------------------------------------
window.onload = async () => {
  await fetchWords();
};

async function isThereEvenOneWord() {
  try {
    const res = await fetch('/learn/isThereEvenOneWord');
    if (res.ok) {
      const fetchedResult = await res.json();

      if (fetchedResult.isThereEvenOneWord === false) {
        const modal = new bootstrap.Modal(
          document.getElementById('noWordsModal')
        );
        modal.show();
        return;
      } else {
        return;
      }
    }
  } catch (err) {
    console.error('Fetch Error:', err);
  }
}
