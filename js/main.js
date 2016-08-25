'use strict';

(function () {
  //Переменные для формы и кнопок
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
    deleteBtn.classList.remove('search-form__delete-btn--show');
  }

  function showDeleteBtn () {
    deleteBtn.classList.add('search-form__delete-btn--show');
  }

  function deleteSearchFieldValue () {
    searchField.value = '';
  }

  function showTipsList () {
    tipsList.classList.add('tips-list--show');
  }

  function hideTipsList () {
    tipsList.classList.remove('tips-list--show');
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
      hideTipsList();
    }
  });

  /*Очищает поле ввода при нажатии на кнопку-крестик
  **и прячет саму кнопку-крестик
   */
  deleteBtn.addEventListener('click', function () {
    deleteSearchFieldValue();
    hideDeleteBtn();
    disableSubmitBtn();
    hideTipsList();
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

  //Регулярное выражение для проверки на url
  var re = new RegExp('(https?|ftp)://(-\.)?([^\s/?\.#-]+\.?)+(/[^\s]*)?$');

  //Переменные для ссылок и подсказок
  var tipsList = searchForm.querySelector('#tips-list');
  var tipLink1 = tipsList.querySelector('#tip-link-1');
  var tipLink2 = tipsList.querySelector('#tip-link-2');
  var tipLink3 = tipsList.querySelector('#tip-link-3');
  var tips = Array.prototype.slice.call(searchForm.querySelectorAll('.tip'));
  var tipLinks = Array.prototype.slice.call(searchForm.querySelectorAll('.tip__link'));
  var tipTypes = Array.prototype.slice.call(searchForm.querySelectorAll('.tip__type'));

  /*Функция, устанавливающая значения подсказок
  **и атрибуты для ссылок перехода по ним
   */
  function setValuesAndAttributesForTips () {

    //Типы подсказок
    var suggestionType = {
      0: 'Phrase Overview',
      1: 'Domain Overview',
      2: 'URL Overview'
    };

    //Парсит введенный url
    var url = document.createElement('a');
    url.href = searchField.value;

    //Устанавливает значения подсказок
    tipLink1.textContent = url.href;
    tipLink2.textContent = url.hostname;
    tipLink3.textContent = url.hostname + url.pathname + url.search + url.hash;


    tips.forEach(function (tip, i) {
      var query = tip.children[0].textContent;

      //Устанавливает атрибуты для ссылок подсказок
      tip.setAttribute('href',
        'super‑analytics.com/?' +
        'suggestionType=' + suggestionType[i].replace(/\s+/g, '') + '&' +
        'query=' + query);
    });

    //Устанавливает тип подсказки
    tipTypes.forEach(function (tipType, i) {
      tipType.textContent = suggestionType[i];
    });

    //Функция, добавляющая градиент при переполнении блока с ссылкой
    tipLinks.forEach(function (tipLink) {
      if (tipLink.scrollWidth > tipLink.clientWidth) {
        if (tipLink.classList.contains('tip__link--overflowed')) {

        } else {
          tipLink.classList.add('tip__link--overflowed');
        }
      } else {
        if (tipLink.classList.contains('tip__link--overflowed')) {
          tipLink.classList.remove('tip__link--overflowed');
        }
      }
    });
  }

  /*Функция проверки того, является ли введенное
  **в поисковую строку значение ссылкой
   */
  function isSearchFieldValueUrl () {
    if (searchField.value.match(re) !== null) {
      showTipsList();
      setValuesAndAttributesForTips();
    }
  }
})();
