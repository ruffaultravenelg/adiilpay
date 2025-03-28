// Imports
import { GET, DELETE, POST } from './rest.js';
import { explodeLabel } from './labelSplitter.js';
import { showLoader, hideLoader } from './loader.js';
import { showMenu, hideMenu } from './menu.js';
import { showModal, hideModal } from './modals.js';

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

// Refresh window with ?view_transaction argument
document.getElementById('view_transaction_btn').onclick = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('view_transactions', 'true');
    window.location.href = currentUrl.toString();
};

///////////////////////////
//// ADD DEPENSE MODAL ////
///////////////////////////

// Elements
const add_depense_btn = document.getElementById('add_depense_btn');
const add_depense_modal_close = document.getElementById('add_depense_modal_close');
const add_depense_modal_validate = document.getElementById('add_depense_modal_validate');
const add_depense_modal_amount = document.getElementById('add_depense_modal_amount');
const add_depense_modal_description = document.getElementById('add_depense_modal_description');

// Open modal
add_depense_btn.onclick = () => {
    hideMenu();
    showModal('add_depense_modal');
}

// Close modal
add_depense_modal_close.onclick = () => {
    hideModal('add_depense_modal');
    showMenu();
}

// Validate
add_depense_modal_validate.onclick = async () => {
    const amount = add_depense_modal_amount.value;
    const description = add_depense_modal_description.value ? add_depense_modal_description.value : 'Achat à la boutique';
    if (amount && amount !== 0) {
        showLoader();
        try {
            await POST(`/card/${id}/transaction`, { amount: -amount, description, type: 'PAYMENT' });
            hideModal('add_depense_modal');
            showMenu();
        } catch (err) {
            hideModal('add_depense_modal');
            showError("Pas assez d'argent sur votre carte");
        }
        hideLoader();
    }
}

//////////////////////
//// CREDIT MODAL ////
//////////////////////

// Elements
const credit_btn = document.getElementById('credit_btn');
const credit_modal_close = document.getElementById('credit_modal_close');
const credit_modal_validate = document.getElementById('credit_modal_validate');
const credit_modal_amount = document.getElementById('credit_modal_amount');
const credit_modal_description = document.getElementById('credit_modal_description');

// Open modal
credit_btn.onclick = () => {
    hideMenu();
    showModal('credit_modal');
}

// Close modal
credit_modal_close.onclick = () => {
    hideModal('credit_modal');
    showMenu();
}

// Validate
credit_modal_validate.onclick = async () => {
    const amount = credit_modal_amount.value;
    const description = credit_modal_description.value ? credit_modal_description.value : 'Recharge';
    if (amount && amount !== 0) {
        showLoader();
        try {
            await POST(`/card/${id}/transaction`, { amount: +amount, description, type: 'DEPOSIT' });
            hideModal('credit_modal');
            showMenu();
        } catch (err) {
            hideModal('credit_modal');
            showError(err);
        }
        hideLoader();
    }
}

////////////////////
//// DEACTIVATE ////
////////////////////
const deactivate_btn = document.getElementById('deactivate_btn');
const deactivate_modal_close = document.getElementById('deactivate_modal_close');
const deactivate_modal_validate = document.getElementById('deactivate_modal_validate');

// Open modal
deactivate_btn.onclick = () => {
    hideMenu();
    showModal('deactivate_modal');
}

// Close modal
deactivate_modal_close.onclick = () => {
    hideModal('deactivate_modal');
    showMenu();
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
        hideModal('deactivate_modal');
        showMenu();
    }
    
}

/////////////////////
//// ERROR MODAL ////
/////////////////////
const error_modal_text = document.getElementById('error_modal_text');
const error_modal_ok = document.getElementById('error_modal_ok');

// Open modal
function showError(msg){
    hideMenu();
    error_modal_text.innerText = msg;
    showModal('error_modal');
}

// Close modal
error_modal_ok.onclick = () => {
    hideModal('error_modal');
    showMenu();
}