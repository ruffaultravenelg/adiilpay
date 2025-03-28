// Get element
const menu = document.querySelector('.actions');

// Open menu
setTimeout(() => {
    showMenu();
}, 20);

// Show menu function
export function showMenu(){
    menu.classList.add('showed');
    menu.querySelector('input, button, textarea').focus();
}

// Hide menu fucntion
export function hideMenu(){
    menu.classList.remove('showed');
    document.body.focus();
}