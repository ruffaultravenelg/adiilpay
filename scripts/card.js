// Imports
import { GET } from './rest.js';
import { explodeLabel } from './labelSplitter.js';
import { isConnected } from './auth.js'

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
    window.location.href = '/card404';

// Load card data
let userData;
try {
    userData = await GET(`/cards/${id}`, false);
} catch (err) {
    window.location.href = '/card404';
}

// Split label
const { firstname, lastname } = explodeLabel(userData.label);

// Set card data
card_firstname.innerText = firstname;
card_lastname.innerText = lastname;
card_sold.innerText = `${userData.balance}€`;
card_id.innerText = userData.id.substring(0, 15);
card_orga.innerText = localStorage.getItem('org_name');

// Check if user is connected
if (isConnected()){

} else {
    
}