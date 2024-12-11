let billInput = document.getElementById('bill');
let customTipInput = document.getElementById('custom-tip');
let peopleInput = document.getElementById('people');
const tipButtons = document.querySelectorAll('.tip__button');
const tipAmountDisplay = document.querySelector('.tip__amount');
const totalAmountDisplay = document.querySelector('.total__amount');
const peopleError = document.getElementById('people-error');
const peopleInputCont = document.querySelector('.people__input');
const resetButton = document.getElementById('reset');

let billValue = 0;
let tipValue = 0;
let peopleValue = 1;

// Function to calculate and update the tip and total amounts
function calculateTip() {
  if (peopleInput.value === '' || peopleValue === 0) {
    peopleError.textContent = "Can't be zero";
    peopleInputCont.classList.add('error');
    return;
  } else {
    peopleError.textContent = "";
    peopleInputCont.classList.remove('error');
  }

  const tipAmount = (billValue * (tipValue / 100)) / peopleValue;
  const totalAmount = (billValue / peopleValue) + tipAmount;

  tipAmountDisplay.textContent = tipAmount.toFixed(2);
  totalAmountDisplay.textContent = totalAmount.toFixed(2);
}

// Function to check if the reset button should be enabled or disabled
function checkResetButton() {
  if (billInput.value === '' && customTipInput.value === '' && peopleInput.value === '') {
    resetButton.disabled = true;
  } else {
    resetButton.disabled = false;
  }
}

// Add event listeners to each tip button
tipButtons.forEach(button => {
  button.addEventListener('click', function() {
    tipValue = parseFloat(this.textContent.replace('%', ''));
    customTipInput.value = ''; // Clear custom tip input if a button is clicked
    calculateTip();
    checkResetButton();
  });
});

// Add event listener to custom tip input
customTipInput.addEventListener('input', function() {
  tipValue = parseFloat(customTipInput.value) || 0;
  calculateTip();
  checkResetButton();
});

// Add event listeners to bill and people inputs
billInput.addEventListener('input', function() {
  billValue = parseFloat(billInput.value) || 0;
  calculateTip();
  checkResetButton();
});

peopleInput.addEventListener('input', function() {
  peopleValue = parseFloat(peopleInput.value) || 0;
  calculateTip();
  checkResetButton();
});

// Initial check to disable the reset button if inputs are empty
checkResetButton();