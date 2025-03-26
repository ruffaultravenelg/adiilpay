// Imports
import { POST } from './rest.js';
import { explodeLabel } from "./labelSplitter.js";
import { showLoader, hideLoader } from "./loader.js";
import { isNFCSupported } from "./nfc.js";

// NFC stuff
async function saveToNFC(url) {
    try {
        const ndef = new NDEFReader();
        await ndef.write({ records: [{ recordType: "url", data: url }] });
        update_nfc_modal.classList.remove('showed');
        nfc_ok_modal.classList.add('showed');
    } catch (error) {
        nfc_err_modal_errmsg.innerText = error.message;
        update_nfc_modal.classList.remove('showed');
        nfc_err_modal.classList.add('showed');
    }
}

// Card
const card_firstname = document.getElementById('card_firstname');
const card_lastname = document.getElementById('card_lastname');
const label_input = document.getElementById('label_input');

// Update label preview
label_input.onkeyup = () => {
    const { firstname, lastname } = explodeLabel(label_input.value ? label_input.value : 'LABEL Label');
    card_firstname.innerText = firstname;
    card_lastname.innerText = lastname;
}

// Copy to clipboard button
document.getElementById('copy_url').onclick = ()=>{
    navigator.clipboard.writeText(nonfc_url.textContent);
}

// Modals
const creation_modal = document.getElementById('creation_modal');
const update_nonfc_modal = document.getElementById('update_nonfc_modal');
const update_nfc_modal = document.getElementById('update_nfc_modal');
const nfc_err_modal = document.getElementById('nfc_err_modal');
const nfc_ok_modal = document.getElementById('nfc_ok_modal');
const nonfc_url = document.getElementById('nonfc_url');
const nfc_write_btn = document.getElementById('nfc_write_btn');
const nfc_err_modal_errmsg = document.getElementById('nfc_err_modal_errmsg');

// On click
document.getElementById('create_btn').addEventListener('click', async () => {

    // Check if label isn't empty
    if (!label_input.value)
        return;

    // Get label
    const label = label_input.value;

    // Do post request
    showLoader();
    //const { id } = await POST('card', { label });
    const id = 'ijfeosifjeio';
    hideLoader();

    // Create url
    const url = `https://adiilpay.com/cards?id=${id}`;

    // Hide creation window
    creation_modal.classList.remove('showed');

    // Is NFC available ?
    if (isNFCSupported()) {
        update_nfc_modal.classList.add('showed');
        nfc_write_btn.onclick = () => saveToNFC(url);
    } else {
        nonfc_url.innerText = url;
        update_nonfc_modal.classList.add('showed');
    }

});