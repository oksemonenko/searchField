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
  // var re = new RegExp('^(https?|ftp):\/\/([^\s/$.?#].[^\s]*)$');
  var re = new RegExp('(https?|ftp)://(-\.)?([^\s/?\.#-]+\.?)+(/[^\s]*)?$');
  var tipsList = searchForm.querySelector('#tips-list');
  var tipLink1 = tipsList.querySelector('#tip-link-1');
  var tipLink2 = tipsList.querySelector('#tip-link-2');
  var tipLink3 = tipsList.querySelector('#tip-link-3');
  var tips = Array.prototype.slice.call(searchForm.querySelectorAll('.tip'));
  var tipLinks = Array.prototype.slice.call(searchForm.querySelectorAll('.tip__link'));
  var tipTypes = Array.prototype.slice.call(searchForm.querySelectorAll('.tip__type'));

  function setValuesAndAttributesForTips () {
    var suggestionType = {
      0: 'Phrase Overview',
      1: 'Domain Overview',
      2: 'URL Overview'
    };

    // tipLink1.textContent = searchField.value.match(re)[0];
    // tipLink2.textContent = 'привет';
    // tipLink3.textContent = searchField.value.replace(re, '$2');

    // tip1.textContent = searchField.value.match(re)[0];
    // tip2.textContent = 'привет';
    // tip3.textContent = searchField.value.replace(re, '$2');


    var url = document.createElement('a');
    url.href = searchField.value;
    // var prot = url.protocol;

    tipLink1.textContent = url.href;
    tipLink2.textContent = url.hostname;
    tipLink3.textContent = url.hostname + url.pathname + url.search + url.hash;


    tips.forEach(function (tip, i) {
      var query = tip.children[0].textContent;

      tip.setAttribute('href',
        'super‑analytics.com/?' +
        'suggestionType=' + suggestionType[i].replace(/\s+/g, '') + '&' +
        'query=' + query);

      // var tipChildren = Array.prototype.slice.call(tip.children);
      // // var tipChildrenWidth = tipChildren.forEach(function (tipChild) {
      // //   var tipChildWidth = tipChild.offsetWidth;
      // // });
      //
      // var tipChildrenWidth = tipChildren[0].offsetWidth +
      //   tipChildren[1].offsetWidth +
      //   tipChildren[2].offsetWidth;
      //
      // if (tipChildrenWidth === tip.offsetWidth) {
      //   console.log('привет!');
      // }

      // var linkSpan = document.createElement('span');
      // tip.appendChild(linkSpan);
      //
      //
      // var span = document.createElement('span');
      // var inSpan = document.createElement('span');
      // tip.appendChild(span);
      // span.textContent = suggestionType[i];
      // span.classList.add('tip__type');
      // span.insertBefore(inSpan, span.firstChild);
      // inSpan.textContent = 'in';
      // inSpan.classList.add('tip__in');
    });

    tipTypes.forEach(function (tipType, i) {
      tipType.textContent = suggestionType[i];
    });

    tipLinks.forEach(function (tipLink) {
      // tipLink.addEventListener('overflow', setGradient);
      if (tipLink.scrollWidth > tipLink.clientWidth) {
        tipLink.classList.add('tip__link--overflowed');
      } else {
        if (tipLink.classList.contains('tip__link--overflowed')) {
          tipLink.classList.remove('tip__link--overflowed');
        }
      }
    });

    // function isOverflowed(element){
    //   if (element.scrollWidth > element.clientWidth) {
    //     console.log('привет!');
    //   }
    // }

    // function setGradient() {
    //   console.log('привет!');
    // }
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
