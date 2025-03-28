// HTML Elements
const modalContainer = document.querySelector('.modals');

// Show modal
export function showModal(modalID){

    // Get elm
    const modal = document.getElementById(modalID);

    // Show animation
    modal.classList.add('showed');

    // Set focus
    modal.querySelector("input, button, textarea").focus();

    // Remove content of all inputs
    modal.querySelectorAll('input').forEach(input => input.value = '');

}

// Hide modal
export function hideModal(modalID){

    // Get elm
    const modal = document.getElementById(modalID);

    // Hide animation
    modal.classList.remove('showed');

    // Set focus
    document.body.focus();

}