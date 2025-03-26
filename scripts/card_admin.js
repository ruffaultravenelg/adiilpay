// Imports
import { GET, DELETE } from './rest.js';
import { explodeLabel } from './labelSplitter.js';
import { showLoader, hideLoader } from './loader.js';

// HTML Elements
const card_firstname = document.getElementById('admin_card_firstname');
const card_lastname = document.getElementById('admin_card_lastname');
const card_sold = document.getElementById('admin_card_sold');
const card_id = document.getElementById('admin_card_id');
const card_orga = document.getElementById('admin_card_orga');

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

///////////////////////////
//// ADD DEPENSE MODAL ////
///////////////////////////

// Elements
const add_depense_btn = document.getElementById('add_depense_btn');
const add_depense_modal = document.getElementById('add_depense_modal');
const add_depense_modal_close = document.getElementById('add_depense_modal_close');

// Open modal
add_depense_btn.onclick = () => {
    panel_admin.classList.remove('showed');
    add_depense_modal.classList.add('showed');
    console.log(add_depense_modal);
}

// Close modal
add_depense_modal_close.onclick = () => {
    add_depense_modal.classList.remove('showed');
    panel_admin.classList.add('showed');
}


////////////////////
//// DEACTIVATE ////
////////////////////
const deactivate_modal = document.getElementById('deactivate_modal');
const deactivate_btn = document.getElementById('deactivate_btn');
const deactivate_modal_close = document.getElementById('deactivate_modal_close');
const deactivate_modal_validate = document.getElementById('deactivate_modal_validate');

// Open modal
deactivate_btn.onclick = () => {
    panel_admin.classList.remove('showed');
    deactivate_modal.classList.add('showed');
}

// Close modal
deactivate_modal_close.onclick = () => {
    deactivate_modal.classList.remove('showed');
    panel_admin.classList.add('showed');
}

// Validate deactivation
deactivate_modal_validate.onclick = async () => {

    try{
        showLoader();
        await DELETE(`/cards/${id}/nuke`);
        hideLoader();
        window.location.href = '/cards';
    } catch (err) {
        console.error(err);
        deactivate_modal.classList.remove('showed');
        panel_admin.classList.add('showed');
    }

    
   
    
}