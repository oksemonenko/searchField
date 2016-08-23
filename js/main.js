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

  // var re = new RegExp('#\b(([\w-]+://?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/)))#iS');
  // var re = /^(https?|ftp):/ + /[^\s/$.?#].[^\s]*$/;
  ///^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
  // var reg = /[^\s\/$.?#].[^\s]*/;
  var re = new RegExp('^(https?|ftp):\/\/([^\s/$.?#].[^\s]*)$');
  var tipsList = searchForm.querySelector('#tips-list');
  var tip1 = tipsList.querySelector('#tip-1');
  var tip2 = tipsList.querySelector('#tip-2');
  var tip3 = tipsList.querySelector('#tip-3');
  var tips = Array.prototype.slice.call(searchForm.querySelectorAll('.tip'));
  // var tipTypes = Array.prototype.slice.call(searchForm.querySelectorAll('.tip__type'));

  function setValuesAndAttributesForTips () {
    var suggestionType = {
      0: 'PhraseOverview',
      1: 'DomainOverview',
      2: 'URLOverview'
    };

    tip1.textContent = searchField.value.match(re)[0];
    tip2.textContent = 'привет';
    tip3.textContent = searchField.value.replace(re, '$2');


    tips.forEach(function (tip, i) {
      var query = tip.textContent;

      tip.setAttribute('href',
        'super‑analytics.com/?' +
        'suggestionType=' + suggestionType[i] + '&' +
        'query=' + query);


      var span = document.createElement('span');
      var inSpan = document.createElement('span');
      tip.appendChild(span);
      span.textContent = suggestionType[i];
      span.classList.add('tip__type');
      span.insertBefore(inSpan, span.firstChild);
      inSpan.textContent = 'in';
      inSpan.classList.add('tip__in');
    });


  //
  //   tipTypes.forEach(function (tipType, i) {
  //     tipType.textContent = suggestionType[i];
  //   })
  }


  function isSearchFieldValueUrl () {
    if (searchField.value.match(re) !== null) {
      showTipsList();
      setValuesAndAttributesForTips();
      // tip1.setAttribute('href', 'super‑analytics.com/?' + tip1.textContent);
    }
  }

  // function escapeRegExp(string) {
  //   //([.*+?^${}()|\[\]/\\])
  //   //(a)(ab)  aab $1 = a, $2=ab
  //   //(a+)(.b{2}).* aadbbc $1=aa $2=dbb
  //   return string.replace(/(a+)(.b{2}).*/, "\\$1");
  // }

})();
