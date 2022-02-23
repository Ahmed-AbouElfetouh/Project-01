// global vars.
const webSiteColors = document.querySelectorAll('.colors-list li');
const randomBackgroundBtns = document.querySelectorAll(
  '.random-background-btns span',
);
const randomBulletsBtns = document.querySelectorAll(
  '.random-bullets-btns span',
);
const bulletsContainer = document.getElementById('bullets');
const onButton = document.getElementById('on');
const offButton = document.getElementById('off');
const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');

let backgroundOption = true;
// let bulletOption = true;
let backgroundIntervial;

// check for color in local storage
let colorsData = localStorage.getItem('website-Color');
if (colorsData) {
  document.documentElement.style.setProperty('--mainColor', colorsData);
  webSiteColors.forEach((element) => {
    element.classList.remove('active');
    if (element.dataset.color === colorsData) {
      element.classList.add('active');
    }
  });
}

// check for background in local storage
let backgroundData = localStorage.getItem('website-background');
if (backgroundData) {
  randomBackgroundBtns.forEach((btn) => {
    btn.classList.remove('active');
  });
  if (backgroundData === 'true') {
    backgroundOption = true;
    onButton.classList.add('active');
  } else {
    backgroundOption = false;
    offButton.classList.add('active');
  }
}

// check for bullets in local storage
let bulletsData = localStorage.getItem('website-bullets');
if (bulletsData) {
  randomBulletsBtns.forEach((btn) => {
    btn.classList.remove('active');
  });
  if (bulletsData === 'block') {
    bulletsContainer.style.display = 'block';
    yesButton.classList.add('active');
  } else {
    bulletsContainer.style.display = 'none';
    noButton.classList.add('active');
  }
}



// scroll to sections by bullets and links
const allBullets = document.querySelectorAll('.bullets ul li');
const allLinks = document.querySelectorAll('.links ul li');

function scrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });
}
scrollToSection(allBullets);
scrollToSection(allLinks);

// add click event to the gear
const gearIcon = document.getElementById('gear-icon');
const settingsBox = document.getElementById('settings-box');

function settingsBoxHandler() {
  this.classList.toggle('fa-spin');
  settingsBox.classList.toggle('open');
}
gearIcon.addEventListener('click', settingsBoxHandler);

function websiteOptionsHandler(arrayOfElements) {
  arrayOfElements.forEach((element) => {
    element.addEventListener('click', (e) => {
      optionsConditions(e);
      arrayOfElements.forEach((el) => {
        el.classList.remove('active');
      });
      e.target.classList.add('active');
    });
  });
}

function optionsConditions(targetElement) {
  if (targetElement.target.dataset.color) {
    document.documentElement.style.setProperty(
      '--mainColor',
      targetElement.target.dataset.color,
    );
    saveDataToLocalStorage('website-Color', targetElement.target.dataset.color);
  } else if (targetElement.target.dataset.background === 'yes') {
    backgroundOption = true;
    randomBackground();
    saveDataToLocalStorage('website-background', true);
  } else if (targetElement.target.dataset.background === 'no') {
    backgroundOption = false;
    clearInterval(backgroundIntervial);
    saveDataToLocalStorage('website-background', false);
  } else if (targetElement.target.dataset.bullets === 'show') {
    bulletsContainer.style.display = 'block';
    saveDataToLocalStorage('website-bullets', 'block');
  } else if (targetElement.target.dataset.bullets === 'hide') {
    bulletsContainer.style.display = 'none';
    saveDataToLocalStorage('website-bullets', 'none');
  }
}

function saveDataToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

// handel website colors
websiteOptionsHandler(webSiteColors);

// handel change website background
websiteOptionsHandler(randomBackgroundBtns);

// handel show AND hide website bullets
websiteOptionsHandler(randomBulletsBtns);

// change background image random
const arrayOfPics = ['1.jpeg', '2.jpg', '3.jpg', '5.png'];
const theLandingPage = document.getElementById('landing-page');
let randomPic;
function randomBackground() {
  if (backgroundOption === true) {
    backgroundIntervial = setInterval(() => {
      randomPic = arrayOfPics[Math.floor(Math.random() * arrayOfPics.length)];
      theLandingPage.style.background = `url(images/landing-page/${randomPic})center center no-repeat`;
    }, 10000);
  }
}
randomBackground();

// animate width on scrolling
const theSection = document.getElementById('skills');
const targetSpans = document.querySelectorAll('.prog span');
window.onscroll = function () {
  if (window.scrollY >= theSection.offsetTop) {
    targetSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};

// popup in gallary section
const allImages = document.querySelectorAll('.images img');
allImages.forEach((img) => {
  img.addEventListener('click', (e) => {
    let overlayDiv = document.createElement('div');
    overlayDiv.className = 'popup-overlay';
    document.body.append(overlayDiv);

    let popupBoxDiv = document.createElement('div');
    popupBoxDiv.className = 'popup-box';

    if (e.target.alt) {
      let popupHeading = document.createElement('h3');
      let popupHeadingText = document.createTextNode(e.target.alt);
      popupHeading.append(popupHeadingText);
      popupBoxDiv.append(popupHeading);
    }

    let closePopupBtn = document.createElement('span');
    closePopupBtn.className = 'close-btn';
    let closePopupBtnText = document.createTextNode('X');
    closePopupBtn.append(closePopupBtnText);
    popupBoxDiv.append(closePopupBtn);

    let popupBoxImage = document.createElement('img');
    popupBoxImage.src = e.target.src;

    popupBoxDiv.append(popupBoxImage);
    document.body.append(popupBoxDiv);
  });
});
// close the popup
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('close-btn')) {
    e.target.parentElement.remove();
    document.querySelector('.popup-overlay').remove();
  }
});

// reset all options
const resetBtn = document.getElementById('reset-btn');

function removeLocalStorageData() {
  localStorage.removeItem('website-Color');
  localStorage.removeItem('website-background');
  localStorage.removeItem('website-bullets');
  window.location.reload();
}

resetBtn.addEventListener('click', removeLocalStorageData);

// open and close navbar
const toggleBtn = document.getElementById('toggle');
const linksList = document.getElementById('links-list');

function toggleNavbarHanler() {
  this.classList.toggle('menu-arrow');
  linksList.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  if (e.target != toggleBtn && e.target != linksList) {
    if (linksList.classList.contains("open")) {
      toggleBtn.classList.remove('menu-arrow');
      linksList.classList.remove('open');
    }
  }
});

linksList.addEventListener('click', (e) => {
  e.stopPropagation();
});

toggleBtn.addEventListener('click', toggleNavbarHanler);
