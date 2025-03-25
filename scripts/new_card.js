// Imports
import { POST } from './rest.js';
import { explodeLabel } from "./labelSplitter.js";
import { showLoader, hideLoader } from "./loader.js";
import { isNFCSupported } from "./nfc.js";

// NFC stuff
async function saveToNFC(url) {
    if (!('NDEFReader' in window)) {
        console.error("Web NFC n'est pas supporté par ce navigateur.");
        alert("Votre navigateur ne supporte pas la fonctionnalité NFC.");
        return;
    }

    try {
        const ndef = new NDEFReader();
        await ndef.write({ records: [{ recordType: "url", data: url }] });
        console.log("L'URL a été enregistrée avec succès sur la carte NFC !");
        alert("L'URL a été sauvegardée avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'écriture sur le NFC :", error);
        alert("Échec de l'écriture sur la carte NFC. Veuillez réessayer.");
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

// Modals
const creation_modal = document.getElementById('creation_modal');
const update_nonfc_modal = document.getElementById('update_nonfc_modal');

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

    // Hide creation window
    creation_modal.classList.remove('showed');

    // Is NFC available ?
    if (isNFCSupported()) {
        alert('huh');
    } else {
        update_nonfc_modal.classList.add('showed');
    }

});