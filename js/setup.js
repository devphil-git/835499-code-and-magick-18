'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');


var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandom = function (element) {
  return element[Math.floor(Math.random() * element.length)];
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
};

var wizards = [];
var fragment = document.createDocumentFragment();

for (var i = 0; i < WIZARDS_COUNT; i++) {
  wizards.push({
    name: getRandom(FIRST_NAMES) + ' ' + getRandom(LAST_NAMES),
    coatColor: getRandom(COAT_COLORS),
    eyesColor: getRandom(EYES_COLORS)
  });

  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');


// setup windows open/close
var setupOpenButton = document.querySelector('.setup-open');
var setupWindow = document.querySelector('.setup');
var setupCloseButton = setupWindow.querySelector('.setup-close');
var setupUserName = setupWindow.querySelector('.setup-user-name');

// function to open
var onPopupOpen = function () {
  setupWindow.classList.remove('hidden');
};

// function to close
var onPopupClose = function () {
  setupWindow.classList.add('hidden');
};

// keys to open
setupOpenButton.addEventListener('click', onPopupOpen);
setupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onPopupOpen();
  }
});

// keys to close
setupCloseButton.addEventListener('click', onPopupClose);
setupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onPopupClose();
  }
});

// closing when username field not active
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE && setupUserName !== document.activeElement) {
    onPopupClose();
  }
});

// changing wizard colors
var setupWizard = setupWindow.querySelector('.setup-wizard');

// new color function
var setNewColor = function (colorsArray, styleSelector, targetElement, hiddenInput) {
  var newColor = getRandom(colorsArray);
  targetElement.style[styleSelector] = newColor;
  hiddenInput.value = newColor;
};

// set new coat color
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var hiddenInputCoat = setupWindow.querySelector('[name = coat-color]');

wizardCoat.addEventListener('click', function () {
  setNewColor(COAT_COLORS, 'fill', wizardCoat, hiddenInputCoat);
});

// set new eyes color
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var hiddenInputEyes = setupWindow.querySelector('[name = eyes-color]');

wizardEyes.addEventListener('click', function () {
  setNewColor(EYES_COLORS, 'fill', wizardEyes, hiddenInputEyes);
});

// set new fireball color
var fireball = setupWindow.querySelector('.setup-fireball-wrap');
var hiddenInputFireball = setupWindow.querySelector('[name = fireball-color]');

fireball.addEventListener('click', function () {
  setNewColor(FIREBALL_COLORS, 'background-color', fireball, hiddenInputFireball);
});
