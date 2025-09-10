const wordNameDOM = document.getElementById('word');
const wordMeanDOM = document.getElementById('mean');
const wordPartOfSpeechDOM = document.getElementById('partOfSpeech');
const wordPhoneticsDOM = document.getElementById('Phonetics');
const wordCategoryDOM = document.getElementById('category');
const wordProgressDOM = document.getElementById('progress');

let wordsRandom = [];
fetchWordsRandom();
currentIndex = 0;
showRandom(currentIndex);
console.log(wordsRandom);
function showRandom(index) {
  let word = wordsRandom[index];
  console.log(word);
  if (!word) {
    wordNameDOM.innerHTML = `--`;
    wordMeanDOM.innerHTML = `--`;
    wordPartOfSpeechDOM.innerHTML = `--`;
    wordPhoneticsDOM.innerHTML = '--';
    wordProgressDOM.innerHTML = '--';
    wordCategoryDOM.innerHTML = '--';
  }

  const progressMap = {
    0: { class: 'color-new', label: 'New', border: 'border-new' },
    1: {
      class: 'color-remembered',
      label: 'Progress 1',
      border: 'border-remembered',
    },
    2: {
      class: 'color-remembered',
      label: 'Progress 2',
      border: 'border-remembered',
    },
    3: {
      class: 'color-remembered',
      label: 'Progress 3',
      border: 'border-remembered',
    },
    4: {
      class: 'color-remembered',
      label: 'Progress 4',
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
}

async function fetchWordsRandom() {
  try {
    const res = await fetch('/write/write-words-random');
    if (res.ok) {
      const fetchedWords = await res.json();
      wordsRandom.length = 0;
      wordsRandom.push(...fetchedWords);

      if (!wordsRandom.length) {
        const modal = new bootstrap.Modal(
          document.getElementById('noWordsModal')
        );
        modal.show();
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
