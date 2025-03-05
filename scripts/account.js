// Imports
import { GET } from './rest.js';

// HTML Elements
const card_firstname = document.getElementById('card_firstname');
const card_lastname = document.getElementById('card_lastname');
const card_sold = document.getElementById('card_sold');
const card_id = document.getElementById('card_id');
const card_orga = document.getElementById('card_orga');

// Get user id ?id
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
if (!id)
    window.location.href = '/user404';

// Load card data
let userData;
try {
    userData = await GET(`/user/${id}`);
} catch (err) {
    window.location.href = '/user404';
}

// Display user data
console.log(userData);

card_firstname.innerText = userData.name;
card_lastname.innerText = userData.surname;
card_sold.innerText = `${userData.balance}€`;
card_id.innerText = userData.id.substring(0, 15);
card_orga.innerText = 'adiil pay'