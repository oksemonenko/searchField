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
  searchField.addEventListener('input', function () {
    showDeleteBtn();
    enableSubmitBtn();
    isSearchFieldValueUrl();
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

  /*Отправляет данные формы на адрес super‑analytics.com
  ** в запросе: идентификатор формы и поле query, содержащее введённый текст
   */
  searchForm.addEventListener('submit' ,function (evt) {
    evt.preventDefault();

    var formData = new FormData(document.forms.search);
    var formId = searchForm.getAttribute('id');

    //Добавляет идентификатор формы в тело запроса
    formData.append('formID', formId);

    //Удаляет значение поля submit из тела запроса
    formData.delete('submit', 'submit.value');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://super‑analytics.com/');
    xhr.send(formData);
  });

  // var re = new RegExp('#\b(([\w-]+://?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/)))#iS');
  var re = /^(https?|ftp):/ + /[^\s/$.?#].[^\s]*$/;
  var tipsList = searchForm.querySelector('#tips-list');

  function isSearchFieldValueUrl () {
    if (re.match(searchField.value) !== null) {
      tipsList.classList.add('tips-list--show');
    }
  }

  // function escapeRegExp(string) {
  //   //([.*+?^${}()|\[\]/\\])
  //   //(a)(ab)  aab $1 = a, $2=ab
  //   //(a+)(.b{2}).* aadbbc $1=aa $2=dbb
  //   return string.replace(/(a+)(.b{2}).*/, "\\$1");
  // }

})();