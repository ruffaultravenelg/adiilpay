// Imports
import { GET } from './rest.js';
import { explodeLabel } from './labelSplitter.js';

// HTML Elements
const panel = document.getElementById('admin_panel_admin');
const card_firstname = panel.getElementById('admin_card_firstname');
const card_lastname = panel.getElementById('admin_card_lastname');
const card_sold = panel.getElementById('admin_card_sold');
const card_id = panel.getElementById('admin_card_id');
const card_orga = panel.getElementById('admin_card_orga');

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