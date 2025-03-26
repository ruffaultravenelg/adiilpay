// Imports
import { showLoader, hideLoader } from './loader.js';
import { GET } from './rest.js';
import { explodeLabel } from './labelSplitter.js'

// HTML Elements
const search_input = document.getElementById('search_input');
const results = document.getElementById('results');

// Search input event listener
search_input.addEventListener('input', updateSearchResult);

// Fetch data
showLoader();
const cards = await GET('/cards');
hideLoader();

updateSearchResult();

// Update search results
function updateSearchResult(){

    // Clear previous results
    results.innerHTML = '';

    // Get search term
    const search_term = search_input.value.toLowerCase();

    // Filter users
    const filtered_cards = cards.filter(card => (card.id + ' ' + card.date + ' ' + card.label).toLowerCase().includes(search_term));

    // Display results
    filtered_cards.forEach(card => {
        
        // Get name
        const { firstname, lastname } = explodeLabel(card.label);

        // Create user element
        const card_element = document.createElement('button');
        card_element.classList.add('btn-white')
        card_element.innerHTML = `<span>${lastname}</span> ${firstname}`;
        results.appendChild(card_element);

        // Add event listener
        card_element.addEventListener('click', () => {
            window.location.href = `/card?id=${card.id}`;
        });

    });

}

// New card
document.getElementById('new_card').addEventListener('click', () => {
    window.location.href = '/new_card';
});