// Imports
import { login } from './auth.js';

// HTML elements
const login_ = document.getElementById('login');
const password = document.getElementById('password');
const submit = document.getElementById('submit');

// When user tries to login
submit.addEventListener('click', async () => {

    // Get redirect if exists
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');

    // Tries to connect
    const error = await login(login_.value, password.value, redirect);

    // Show error message
    alert(error);

});