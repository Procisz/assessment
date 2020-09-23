
// 'use strict';

const form = document.getElementById('form');
form.addEventListener('submit', formSubmitted());
const nameOfSubmittedNumber = document.getElementById('nameOfSubmittedNumber');

// When page is loading
window.onload = async (event) => {
    templateRenderer();
    event.preventDefault()
};


// On submit event
function formSubmitted() {
    templateRenderer();
};


// Rendering
function templateRenderer() {
    this.nameOfSubmittedNumber.textContent = `number`;
}
