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
    let number = document.getElementById('input').value;
    numberHandler.actualNumber = number;
    const nameOfSubmittedNumber = document.getElementById('nameOfSubmittedNumber');

    if (checkIfDataIsMissingOrUndefined(number) !== true) {
        return nameOfSubmittedNumber.textContent = checkIfDataIsMissingOrUndefined(number)
    }

    else if (checkIfDataIsEmptyString(number) !== true) {
        return nameOfSubmittedNumber.textContent = checkIfDataIsEmptyString(number)
    }
    // parseInt is only because I use type="text" of input;
    else if (checkDataType(parseInt(number), ['number']) !== true) {
        return nameOfSubmittedNumber.textContent = checkDataType(parseInt(number), ['number'])
    }

    else {
        let word = '';
        let isNumberNegative = false;

        if (Math.sign(number) === -1) {
            isNumberNegative = true;
            number = number * -1;
        }

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

        nameOfSubmittedNumber.textContent = isNumberNegative ? `minus ${word}` : word;
    }
}



// VALIDATORS
/** Validator for missing data
* Data not able to miss
* Expect 1 parameter:
* @param data can be anything
*/
function checkIfDataIsMissingOrUndefined(data) {
    try {
        if (!data) return 'Data is missing or undefined.';
        else return true;
    }
    catch (error) { console.log(error) }
};

/** Validator for empty string
* Data not able to be an empty string
* Expect 1 parameter:
* @param data can be anything
*/
function checkIfDataIsEmptyString(data) {
    try {
        if (data == "" || data === "") return 'Data an empty string';
        else return true;
    }
    catch (error) { console.log(error) }
};

/** Validator for data types
* data type can only be the given parameters
* Expect 2 parameters:
* @param data can be anything
* @param enabledTypes can only be an Array contains enabled types
*/
function checkDataType(data, enabledTypes = []) {
    try {
        let allDataTypes = [null, undefined, 'object', 'array', 'bigint', 'symbol', 'function', 'boolean', 'number', 'string']

        /** Remove types from conditions you don't want to check */
        if (enabledTypes.length > 0) {
            enabledTypes.forEach((result) => {
                while (allDataTypes.indexOf(enabledTypes[result]) !== -1) {
                    allDataTypes.splice(allDataTypes.indexOf(enabledTypes[result]), 1);
                }
            })
        }

        /** Check modified conditions to type-check data */
        allDataTypes.forEach((result) => {
            if (typeof data === allDataTypes[result]) {
                return 'Data type is not permitted';
            }
        })
        return true;
    }
    catch (error) { console.log(error) }
};