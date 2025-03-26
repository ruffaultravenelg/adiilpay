// Imports
import { POST } from './rest.js';
import { explodeLabel } from "./labelSplitter.js";
import { showLoader, hideLoader } from "./loader.js";
import { isNFCAvailable, writeNFC } from "./nfc.js";

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
const nonfc_url = document.getElementById('nonfc_url');
const nfc_write_btn = document.getElementById('nfc_write_btn');

creation_modal.classList.add('showed');

// On click
document.getElementById('create_btn').addEventListener('click', async () => {

    // Check if label isn't empty
    if (!label_input.value)
        return;

    // Get label
    const label = label_input.value;

    // Do post request
    showLoader();
    const { id } = await POST('/cards', { label });
    hideLoader();

    // Create url
    const url = `https://pay.gemino.dev/card?id=${id}`;

    // Hide creation window
    creation_modal.classList.remove('showed');

    // Is NFC available ?
    if (isNFCAvailable()) {
        update_nfc_modal.classList.add('showed');

        async function tryWrite(){
            showLoader();
            try{
                await writeNFC(url);
                update_nfc_modal.classList.remove('showed');
                window.location.href = "/dashboard";
                hideLoader();
            } catch (e){
                update_nfc_modal.querySelector('.title').textContent = "Une erreur c'est produite."
                update_nfc_modal.querySelector('.text').textContent = e.message
                hideLoader();
            }
        }
        
        nfc_write_btn.onclick = tryWrite;
        tryWrite();

    } else {
        nonfc_url.innerText = url;
        update_nonfc_modal.classList.add('showed');
    }

    
});