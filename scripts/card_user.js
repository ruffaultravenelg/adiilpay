// Imports
import { GET } from './rest.js';
import { explodeLabel } from './labelSplitter.js';

// HTML Elements
const card_firstname = document.getElementById('user_card_firstname');
const card_lastname = document.getElementById('user_card_lastname');
const card_sold = document.getElementById('user_card_sold');
const card_id = document.getElementById('user_card_id');
const card_orga = document.getElementById('user_card_orga');
const transactions_div = document.getElementById('transactions');

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

// Set title
document.getElementsByTagName('h1').textContent = 'Vos transactions';

// Transaction types
const transactionTypes = {
    PAYMENT: 'attach_money',
    RECHARGE: 'savings',
    REFUND: 'cycle'
};

// Get transactions
const transactions = [];
for (let i = 0; i < 10; i++) {
    transactions.push({
        amount: (Math.random() * 100).toString().substr(0, 5),
        date: new Date().toLocaleDateString(),
        type: Object.keys(transactionTypes)[Math.floor(Math.random() * Object.keys(transactionTypes).length)]
    });
}

// Display transactions
function displayTransaction(transaction){

    const html = `
        <div>
            <span>${transaction.amount}€</span>
            ${transaction.date}
            <span class="icon">${transactionTypes[transaction.type]}</span>
        </div>
    `;

    transactions_div.innerHTML += html;

}

transactions_div.innerHTML = '';
transactions.forEach(displayTransaction);