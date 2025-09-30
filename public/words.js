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

// tooltip
document.addEventListener('DOMContentLoaded', function () {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl, {
      delay: { show: 200, hide: 100 },
      placement: 'top',
      trigger: 'hover',
    });
  });
});

// stop propagation for edit mode
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.dropdown-menu .no-close').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      e.preventDefault();

      touchHandlerCategory();
    });
  });
});
