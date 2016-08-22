'use strict';

(function () {
  var searchForm = document.getElementById('search');
  var searchField = searchForm.querySelector('#field');
  var deleteBtn = searchForm.querySelector('#delete');
  var submitBtn = searchForm.querySelector('#submit');


  // Дисейблит кнопку отправки формы
  disableSubmitBtn();

  function disableSubmitBtn () {
    submitBtn.setAttribute('disabled', true);
  }

  function enableSubmitBtn () {
    submitBtn.removeAttribute('disabled');
  }

  function hideDeleteBtn () {
    deleteBtn.classList.remove('delete-btn--show');
  }

  function showDeleteBtn () {
    deleteBtn.classList.add('delete-btn--show');
  }

  function deleteSearchFieldValue () {
    searchField.value = '';
  }

  /*Показывает кнопку-крестик, если в поле введен хотя бы один символ
  ** и прячет кнопку-крестик, если поле пустое
   */
  searchField.addEventListener('keyup', function () {
    showDeleteBtn();
    enableSubmitBtn();
    if (searchField.value === '') {
      hideDeleteBtn();
      disableSubmitBtn();
    }
  });

  /*Очищает поле ввода при нажатии на кнопку-крестик
  **и прячет саму кнопку-крестик
   */
  deleteBtn.addEventListener('click', function () {
    deleteSearchFieldValue();
    hideDeleteBtn();
    disableSubmitBtn();
  });
})();
