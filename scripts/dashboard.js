// Imports
import { GET } from './rest.js';
import { isNFCReaderAvailable, readNFC } from './nfc.js';

// HTML Elements
const graph_columns = document.getElementById('graph_columns');

// Load graph
GET('/transactions/statistics').then(graph => {
    
    // Clear graph
    graph_columns.innerHTML = '';
    graph = new Array(30).fill({date: new Date().getTime() - 30 * 24 * 60 * 60 * 1000}) // TODO: remove in prod
    // Get max value of payments
    //const maxPayments = Math.max(...graph.map(elm => elm.payments));
    const maxPayments = 100 //TODO: remove, it's for testings purposes

    // Add columns
    for (const column of graph.reverse()) {
        column.payments = Math.floor(Math.random() * maxPayments);//TODO: remove, it's for testings purposes
                
        // Create column
        const div = document.createElement('div');
        div.classList.add('column');
        div.innerHTML = `
            <p class="label">${new Date(column.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}</p>
            <div class="col" style="--val: ${column.payments * 100 / maxPayments};"></div>
        `;

        // Add column to graph
        graph_columns.appendChild(div);

    }

    // Scroll to end
    graph_columns.scrollLeft = graph_columns.scrollWidth;

});

// NFC
if (isNFCReaderAvailable()) {
    const value = await readNFC();
    alert(value);
}