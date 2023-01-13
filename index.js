const watch = document.querySelector('.time');
function showTime() {
  watch.textContent = new Date().toLocaleTimeString();
  setTimeout(() => {
    showTime();
    showDate(
      Object.entries(settingListStatus.language).filter(
        (e) => e[1] == 'active'
      )[0][0]
    );
  }, 1000);
}

// !settings
let settingListStatus = {
  language: {
    en: 'active',
    ru: 'inactive',
  },
  background: {
    git: 'active',
    unsplash: 'inactive',
    flickr: 'inactive',
  },
  theme: {
    nature: 'active',
    city: 'inactive',
    art: 'inactive',
  },
  showHide: {
    'audio player': 'active',
    time: 'active',
    date: 'active',
    greetings: 'active',
    quote: 'active',
    weather: 'active',
    'to Do list': 'active',
  },
};

// !time
const date = document.querySelector('.date');
function showDate(langCurrent) {
  langCurrent = langCurrent == 'en' ? 'en-EN' : 'ru-RU';
  const options = {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
  };
  const currentDate = new Date().toLocaleDateString(langCurrent, options);
  date.innerHTML = currentDate;
}

const greetingContainer = document.querySelector('.greeting-container');

function showGreeting(langCurrent) {
  let placeHolder = langCurrent == 'en' ? '[Enter name]' : '[Ваше имя]';

  let langSett = {
    en: {
      0: 'Good night',
      1: 'Good morning',
      2: 'Good afternoon',
      3: 'Good evening',
    },
    ru: {
      0: 'Доброй ночи',
      1: 'Доброе утро',
      2: 'Добрый день',
      3: 'Добрый вечер',
    },
  };
  langCurrent = langSett[langCurrent];

  greetingContainer.querySelector('span').innerHTML =
    langCurrent[getTimeOfDay()];

  document.querySelector('.name').placeholder = placeHolder;
}

function getTimeOfDay() {
  return Math.floor(+new Date().getHours() / 6);
}

const name1 = document.querySelector('.name');

function getRandomNum() {
  return Math.floor(Math.random() * 20) + 1;
}

let randomNum = getRandomNum();
let bgImg = document.body.style.backgroundImage;

// !weather
const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

async function getWeather(languageByOptions = 'en') {
  weatherIcon.className = 'weather-icon owf';

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${languageByOptions}&appid=4343b32405075ea496d324a6844caae8&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    // let placeHolder = languageByOptions == 'en' ? '[Enter name]' : '[Ваше имя]';
    // document.querySelector('.city').placeholder = placeHolder;

    let langSett = {
      en: {
        wind: `Wind speed: ${Math.floor(data.wind.speed)} m/s`,
        humidity: `Humidity: ${data.main.humidity}%`,
      },
      ru: {
        wind: `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`,
        humidity: `Влажность: ${data.main.humidity}%`,
      },
    };
    let langCurrent = langSett[languageByOptions];

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = langCurrent.wind;
    humidity.textContent = langCurrent.humidity;
    weatherError.textContent = '';
  } catch (e) {
    temperature.textContent = '';
    weatherDescription.textContent = '';
    windSpeed.textContent = '';
    humidity.textContent = '';
    if (city.value == '') {
      weatherError.textContent = '';
    } else {
      weatherError.textContent = `Error! city not found for '${city.value}'!`;
    }
  }
}
city.textContent = 'Minsk';
city.addEventListener('change', getWeather);

// !qoute
let quoteAuthor = document.querySelector('.author');
let quoteContent = document.querySelector('.quote');
let quote;

async function getQuotes(langCurrent) {
  const quotes = langCurrent == 'en' ? 'quotes.json' : 'quotes_ru.json';
  const res = await fetch(quotes);
  const data = await res.json();

  function getQuoteNumb() {
    return Math.floor(Math.random() * 6);
  }

  let quoteNumber = getQuoteNumb();

  while (quote == quoteNumber) {
    quoteNumber = getQuoteNumb();
  }

  quoteContent.textContent = data[quoteNumber]['text'];
  quoteAuthor.textContent = data[quoteNumber]['author'];

  quote = quoteNumber;
}

async function setQuote(langCurrent) {
  console.log(quote);
  const quotes = langCurrent == 'en' ? 'quotes.json' : 'quotes_ru.json';
  const res = await fetch(quotes);
  const data = await res.json();

  quoteContent.textContent = data[quote]['text'];
  quoteAuthor.textContent = data[quote]['author'];
}

document.addEventListener('click', handler);
function handler(event) {
  if (!event.target.classList.contains('change-quote')) return;
  getQuotes(
    Object.entries(settingListStatus.language).filter(
      (e) => e[1] == 'active'
    )[0][0]
  );
}

// !settings
let settingsIcon = document.querySelector('.bottom-section__settings');
settings.addEventListener('click', () => {
  settingsIcon.classList.toggle('active');
});

//close setting tab if click on empty space
window.addEventListener('click', (e) => {
  if (
    (!!e.target.closest('div') &&
      e.target.closest('div').classList.contains('setting-name')) ||
    (!!e.target.closest('div') &&
      e.target.closest('div').classList.contains('setting-container')) ||
    (!!e.target.closest('div') &&
      e.target.closest('div').classList.contains('toggle-button')) ||
    (!!e.target.closest('div') &&
      e.target.closest('div').classList.contains('toggle')) ||
    (!!e.target.closest('div') &&
      e.target.closest('div').classList.contains('settings-section')) ||
    e.target.classList.contains('icono-gear')
  ) {
    return;
  }
  settingsIcon.classList.remove('active');
});

document.addEventListener('click', settingHandler);
function settingHandler(e) {
  if (!e.target.closest('li')) return;
  test1.textContent = '';
  let liContext = e.target.textContent.replace(/\/\S/, 'H');
  Object.entries(settingListStatus[liContext]).forEach((e) => {
    let settingContainer = document.createElement('div');
    settingContainer.classList.add('setting-container');
    settingContainer.style.display = 'flex';
    settingContainer.style.justifyContent = 'space-between';

    let par = document.createElement('div');
    par.classList.add('setting-name');
    par.textContent = e[0];

    let toggle = document.createElement('div');
    toggle.classList.add('toggle');
    if (e[1] == 'inactive') toggle.classList.toggle(e[1]);

    toggle.style.display = 'flex';
    toggle.style.alignItems = 'center';

    let toggleButton = document.createElement('div');
    toggleButton.classList.add('toggle-button');
    if (e[1] == 'inactive') {
      toggleButton.style.marginLeft = '13px';
    }

    toggle.append(toggleButton);

    toggle.addEventListener('click', toggleHandler);
    function toggleHandler(event) {
      if (!toggle.classList.contains('inactive') && liContext != 'showHide') {
        return;
      }
      function nulifier() {
        for (let evr in settingListStatus[liContext]) {
          settingListStatus[liContext][evr] = 'inactive';
          Array.from(document.querySelectorAll('.toggle')).forEach((e) =>
            e.classList.add('inactive')
          );
          Array.from(document.querySelectorAll('.toggle-button')).forEach(
            (e) => (e.style.marginLeft = '13px')
          );
        }
      }
      if (toggleButton.style.marginLeft == '13px') {
        if (liContext != 'showHide') nulifier();
        toggleButton.style.marginLeft = '0px';
        toggleButton.classList.remove('active');
        settingListStatus[liContext][e[0]] = 'active';
        toggle.classList.toggle('inactive');
        if (
          toggle.previousElementSibling.textContent == 'en' ||
          toggle.previousElementSibling.textContent == 'ru'
        ) {
          getWeather(toggle.previousElementSibling.textContent);
          showGreeting(toggle.previousElementSibling.textContent);
          showDate(toggle.previousElementSibling.textContent);
          setQuote(toggle.previousElementSibling.textContent);
        }
      } else {
        if (liContext != 'showHide') nulifier();
        toggleButton.style.marginLeft = '13px';
        toggleButton.classList.remove('active');
        settingListStatus[liContext][e[0]] = 'inactive';
        toggle.classList.toggle('inactive');
      }
    }

    settingContainer.prepend(par);
    settingContainer.append(toggle);

    settingContainer.style.marginBottom = '0.5rem';
    settingContainer.style.lineHeight = '1.35rem';
    settingContainer.style.borderBottom = 'solid 1px #E3F0FF';
    test1.append(settingContainer);
  });
}

let showHideStatus = {
  'audio player': document.querySelector('.player-container'),
  time: document.querySelector('.time'),
  date: document.querySelector('.date'),
  greetings: document.querySelector('.greeting-container'),
  quote: Array.from(document.querySelectorAll('.quotes-hide')),
  weather: document.querySelector('.weather'),
  'to Do list': document.querySelector('.weather'),
};

function updateBySettings(transitionTime = '0.3s') {
  Object.entries(settingListStatus.showHide)
    .filter((e) => e[1] == 'inactive')
    .forEach((e) => {
      let targetObjects = [];
      if (Array.isArray(showHideStatus[e[0]])) {
        targetObjects = [...showHideStatus[e[0]]];
      } else {
        targetObjects.push(showHideStatus[e[0]]);
      }
      [...targetObjects].forEach((e) => {
        e.style.opacity = '0';
        e.style.pointerEvents = 'none';
        e.style.userSelect = 'none';
        e.style.transition = `opacity ease-in ${transitionTime}`;
      });
    });
  Object.entries(settingListStatus.showHide)
    .filter((e) => e[1] == 'active')
    .forEach((e) => {
      let targetObjects = [];
      if (Array.isArray(showHideStatus[e[0]])) {
        targetObjects = [...showHideStatus[e[0]]];
      } else {
        targetObjects.push(showHideStatus[e[0]]);
      }
      [...targetObjects].forEach((e) => {
        e.style.opacity = '1';
        e.style.pointerEvents = 'all';
        e.style.userSelect = 'auto';
        e.style.transition = `opacity ease-in ${transitionTime}`;
      });
    });
}
setInterval(updateBySettings, 500);

// !BG images
async function bgGit(timeOfDay) {
  let dayTime = {
    0: 'night',
    1: 'morning',
    2: 'afternoon',
    3: 'evening',
  };
  let bgArr = [];
  console.log(dayTime[timeOfDay]);
  for (let i = 1; i <= 20; i++) {
    bgArr.push(
      `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${
        dayTime[timeOfDay]
      }/${String(i).padStart(2, '0')}.jpg`
    );
  }
  return bgArr;
}

async function bgUnsplash(timeOfDay, bgNum) {
  let bgArr = [];
  let bgTheme = Object.entries(settingListStatus['theme']).filter(
    (e) => e[1] == 'active'
  )[0][0];

  for (let i = 1; i <= 3; i++) {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${bgTheme}&client_id=R3q6yMkplB-dkDseUjmv0Ueq_KEZxKeWc3DtM-1_FFQ`;
    const res = await fetch(url);
    const data = await res.json();
    bgArr.push(data.urls.regular);
  }
  return bgArr;
}

async function bgFlickr(timeOfDay, bgNum) {
  let bgArr = [];
  let bgTheme = Object.entries(settingListStatus['theme']).filter(
    (e) => e[1] == 'active'
  )[0][0];
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=eb4989192fb2f510b8ee040d9196fb0e&tags=${bgTheme}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  bgArr = data.photos.photo.slice(21, 42).map((e) => e['url_l']);
  return bgArr;
}

let bgArr = [];

function setBg() {
  let timeOfDay = getTimeOfDay();
  let bgNum = String(randomNum).padStart(2, '0');

  let bgOption = Object.entries(settingListStatus['background']).filter(
    (e) => e[1] == 'active'
  )[0][0];
  bgOption = 'bg' + bgOption[0].toUpperCase() + bgOption.slice(1);

  eval(bgOption)(timeOfDay, bgNum).then((data) => (bgArr = data));

  const img = new Image();
  img.src = bgArr[bgNum - 1];

  img.onload = () => {
    document.body.style.backgroundImage = `url(${bgArr[bgNum - 1]})`;
  };
}

function getSlideNext() {
  randomNum == 20 ? (randomNum = 1) : randomNum++;
  if (
    Object.entries(settingListStatus['background']).filter(
      (e) => e[1] == 'active'
    )[0][0] == 'unsplash'
  ) {
    randomNum == 3 ? (randomNum = 1) : randomNum--;
  }
  setBg();
}

document.querySelector('.slide-next').addEventListener('click', getSlideNext);

function getSlidePrev() {
  randomNum == 1 ? (randomNum = 20) : randomNum--;
  if (
    Object.entries(settingListStatus['background']).filter(
      (e) => e[1] == 'active'
    )[0][0] == 'unsplash'
  ) {
    randomNum == 1 ? (randomNum = 3) : randomNum--;
  }

  setBg();
}
document.querySelector('.slide-prev').addEventListener('click', getSlidePrev);

// !localStorage settings
function setLocalStorage() {
  localStorage.setItem('name', name1.value);
  localStorage.setItem('options', JSON.stringify(settingListStatus));
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name') || localStorage.getItem('options')) {
    name1.value = localStorage.getItem('name');
    settingListStatus = JSON.parse(localStorage.getItem('options'));
  }
}
window.addEventListener('load', getLocalStorage);

function optionActivator() {
  getLocalStorage();
  let langCurrent = Object.entries(settingListStatus.language).filter(
    (e) => e[1] == 'active'
  )[0][0];
  showTime();
  showDate(langCurrent);
  getQuotes(langCurrent);
  showGreeting(langCurrent);
  getWeather(langCurrent);
  updateBySettings('0s');
  setBg();
}
document.addEventListener('DOMContentLoaded', optionActivator);
