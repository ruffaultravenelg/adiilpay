// Imports
import { isConnected, login } from './auth.js';
import { showLoader, hideLoader } from './loader.js';

// HTML elements
const login_input = document.getElementById('login_input');
const password_input = document.getElementById('password_input');
const login_label = document.getElementById('login_label');
const password_label = document.getElementById('password_label');
const submit = document.getElementById('submit');
const error_message = document.getElementById('error_message');

// When user tries to login
submit.addEventListener('click', async () => {

    // Check if login or password are empty
    if (login_input.value.length === 0){
        login_label.classList.add('error');
        return;
    }
    if (password_input.value.length === 0){
        password_label.classList.add('error');
        return;
    }

    // Get redirect if exists
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');

    // Tries to connect
    showLoader();
    try{
        await login(login_input.value, password_input.value, redirect);
    } catch (error){
        login_label.classList.add('error');
        password_label.classList.add('error');
        error_message.textContent = error.message ? error.message : 'Identifiant ou mot de passe incorrect.';
    }
    hideLoader();

});

// Add enter
login_input.addEventListener('keyup', (event)=>{
    if (event.key === 'Enter' && login_input.value.length > 0)
        password_input.focus();
})

password_input.addEventListener('keyup', (event)=>{
    if (event.key === 'Enter' && password_input.value.length > 0)
        submit.click();
})

// Check if connected
if (isConnected())
    window.location.href = '/dashboard.html';