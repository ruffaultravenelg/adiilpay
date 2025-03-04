// Imports
import { showLoader, hideLoader } from './loader.js';
import { GET } from './rest.js';

// HTML Elements
const search_input = document.getElementById('search_input');
const results = document.getElementById('results');

// Search input event listener
search_input.addEventListener('input', updateSearchResult);

// Fetch data
showLoader();
const users = await GET('/user');
hideLoader();

updateSearchResult();

// Update search results
function updateSearchResult(){

    // Clear previous results
    results.innerHTML = '';

    // Get search term
    const search_term = search_input.value.toLowerCase();

    // Filter users
    const filtered_users = users.filter(user => (user.name + ' ' + user.surname).toLowerCase().includes(search_term));

    // Display results
    filtered_users.forEach(user => {
        
        // Create user element
        const user_element = document.createElement('button');
        user_element.classList.add('btn-white')
        user_element.innerHTML = `<span>${user.surname}</span> ${user.name}`;
        results.appendChild(user_element);

        // Add event listener
        user_element.addEventListener('click', () => {
            window.location.href = `/account?id=${user.id}`;
        });

    });

}