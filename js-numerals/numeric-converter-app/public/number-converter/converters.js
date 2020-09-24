
'use strict';

const numberHandler = {
    simpleNumbers: ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '],
    tens: ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
    mad: ['', 'thousand', 'million', 'billion', 'trillion'],
};


// When page is loading
window.addEventListener("load", templateRenderer);

// When form is submitted
const form = document.getElementById('form');
form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
    event.preventDefault();
    templateRenderer()
};


// Rendering
function templateRenderer() {
    const number = document.getElementById('input').value;
    numberHandler.actualNumber = number;
    const nameOfSubmittedNumber = document.getElementById('nameOfSubmittedNumber');

    let word = '';
    numberHandler.mad.forEach((result, i) => {
        let tempNumber = number % (100 * Math.pow(1000, i));
        if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
            if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
                word = numberHandler.simpleNumbers[Math.floor(tempNumber / Math.pow(1000, i))] + numberHandler.mad[i] + ' ' + word;
            } else {
                word = numberHandler.tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] + '-' + numberHandler.simpleNumbers[Math.floor(tempNumber / Math.pow(1000, i)) % 10] + numberHandler.mad[i] + ' ' + word;
            }
        }

        tempNumber = number % (Math.pow(1000, i + 1));
        if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0) {
            word = numberHandler.simpleNumbers[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] + 'hunderd ' + word;
        }
    })
    nameOfSubmittedNumber.textContent = word;
}