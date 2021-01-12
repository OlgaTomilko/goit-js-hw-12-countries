import './styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';
import countryTemplate from './templates/theOnlyCountry-template.hbs';
import countriesListTemplate from './templates/countriesList-template.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { error, defaults, Stack } from '@pnotify/core';

defaults.delay = 2000;
defaults.closer = false;
defaults.sticker = false;

const myStack = new Stack({
  dir1: 'up',
  context: document.getElementById('container'),
});

const list = document.querySelector('.countries-list');
const input = document.querySelector('#input');
const container = document.querySelector('.container');

input.addEventListener('input', debounce(onInput, 500));

function onInput() {
  fetchCountries(input.value).then(data => checkList(data));
  clearAll();
}

function clearAll() {
  list.innerHTML = '';
  container.innerHTML = '';
}

function checkList(arr) {
  if (arr === 'SyntaxError') {
    error({
      title: 'Error 404',
      text: 'Not Found',
      stack: myStack,
    });
  } else {
    switch (arr.length) {
      case 0:
        error({
          text: 'Nothing was found!',
          stack: myStack,
        });
        input.value = '';
        break;
      case 1:
        container.insertAdjacentHTML('beforeend', countryTemplate(arr));
        input.value = '';
        break;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        list.insertAdjacentHTML('beforeend', countriesListTemplate(arr));
        break;
      default:
        error({
          text: 'To many matches found. Please enter a more specific query! ',
          stack: myStack,
        });
    }
  }
}
