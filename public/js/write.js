const wordNameDOM = document.getElementById('word');
const wordMeanDOM = document.getElementById('mean');
const wordPartOfSpeechDOM = document.getElementById('partOfSpeech');
const wordPhoneticsDOM = document.getElementById('Phonetics');
const wordCategoryDOM = document.getElementById('category');
const wordProgressDOM = document.getElementById('progress');
const changeButtonDOM = document.getElementById('changeButton');
const saveFormDOM = document.getElementById('saveForm');
const charCountDOM = document.getElementById('charCount');
const textAreaDOM = document.getElementById('textArea');

const doneModal = new bootstrap.Modal(
  document.getElementById('doneExerciseModal')
);

const noWordsModal = new bootstrap.Modal(
  document.getElementById('noWordsModal')
);

isThereEvenOneWord();
let wordsRandom = [];
fetchWordsRandom();
currentIndex = 0;
showRandom(currentIndex);

function showRandom(index) {
  let word = wordsRandom[index];

  if (!word) {
    fetchWordsRandom();
    word = wordsRandom[currentIndex];
    if (!word) {
      wordNameDOM.innerHTML = ``;
      wordMeanDOM.innerHTML = ``;
      wordPartOfSpeechDOM.innerHTML = ``;
      wordPhoneticsDOM.innerHTML = '';
      wordProgressDOM.innerHTML = '';
      wordProgressDOM.className = `small`;
      wordCategoryDOM.innerHTML = '';
      return;
    }
  }

  const progressMap = {
    0: { class: 'color-new', label: 'New', border: 'border-new' },
    1: {
      class: 'color-remembered',
      label: 'Learner 1',
      border: 'border-remembered',
    },
    2: {
      class: 'color-remembered',
      label: 'Learner 2',
      border: 'border-remembered',
    },
    3: {
      class: 'color-remembered',
      label: 'Learner 3',
      border: 'border-remembered',
    },
    4: {
      class: 'color-remembered',
      label: 'Learner 4',
      border: 'border-remembered',
    },
    5: {
      class: 'color-mastered',
      label: 'Mastered 1',
      border: 'border-mastered',
    },
    6: {
      class: 'color-mastered',
      label: 'Mastered 2',
      border: 'border-mastered',
    },
    7: {
      class: 'color-mastered',
      label: 'Mastered 3',
      border: 'border-mastered',
    },
    8: {
      class: 'color-mastered',
      label: 'Mastered 4',
      border: 'border-mastered',
    },
    9: {
      class: 'color-mastered',
      label: 'Mastered 5',
      border: 'border-mastered',
    },
    10: { class: 'color-mastered', label: 'Expert', border: 'border-mastered' },
    11: {
      class: 'color-mastered',
      label: 'Proficient',
      border: 'border-mastered',
    },
  };

  const p = progressMap[word.progress];

  wordProgressDOM.innerHTML = `<i class="fa-solid fa-circle"></i> ${p.label}`;
  wordProgressDOM.className = `${p.class} ${p.border} small`;

  wordNameDOM.innerHTML = word.word;
  wordMeanDOM.innerHTML = word.meaning;
  wordPartOfSpeechDOM.innerHTML = word.partOfSpeech ? word.partOfSpeech : '--';
  wordPhoneticsDOM.innerHTML = word.phonetics ? word.phonetics : '--';
  wordCategoryDOM.innerHTML = word.category ? word.category.name : '--';
  saveFormDOM.action = `/write/save-write-article/${word._id}`;
}

async function fetchWordsRandom() {
  try {
    const res = await fetch('/write/write-words-random');
    if (res.ok) {
      const fetchedWords = await res.json();
      wordsRandom.length = 0;
      wordsRandom.push(...fetchedWords);

      const result = await isThereEvenOneWord();
      if (result === false) {
        doneModal.hide();
        return;
      }
      if (!wordsRandom.length) {
        doneModal.show();
        return;
      }

      currentIndex = 0;
      console.log(fetchedWords);
      showRandom(currentIndex);
    }
  } catch (err) {
    console.error('Fetch Error:', err);
  }
}

async function isThereEvenOneWord() {
  try {
    const res = await fetch('/learn/isThereEvenOneWord');
    if (res.ok) {
      const fetchedResult = await res.json();

      if (fetchedResult.isThereEvenOneWord === false) {
        noWordsModal.show();
        return false;
      } else {
        return true;
      }
    }
  } catch (err) {
    console.error('Fetch Error:', err);
  }
}

changeButtonDOM.addEventListener('click', () => {
  currentIndex++;
  showRandom(currentIndex);
});

saveFormDOM.addEventListener('submit', function (event) {
  const textArea = document.getElementById('textArea');

  const normalized = textArea.value.replace(/\s+/g, ' ');

  if (normalized.length < 1000) {
    event.preventDefault();
    showAlert();
  }
});

function showAlert() {
  const alertMinCharacterDOM = document.getElementById('alertMinChar');
  alertMinCharacterDOM.classList.remove('d-none');

  setTimeout(() => {
    alertMinCharacterDOM.classList.add('d-none');
  }, 2000);
}

textAreaDOM.addEventListener('input', () => {
  const normalized = textAreaDOM.value.replace(/\s+/g, ' ');
  charCountDOM.textContent = normalized.length;
  if (normalized.length >= 1000) {
    charCountDOM.style.color = 'green';
  } else {
    charCountDOM.style.color = 'red';
  }
});
