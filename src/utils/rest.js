// Import auth module to get bearer token
import { getBearerToken, redirectToLogin } from './auth.js';
import router from '@/router/index.js';

// API base url
const API_URL = 'https://api.adiilpay.com'

/**
 * Makes an asynchronous HTTP request using the Fetch API.
 *
 * @param {string} method - The HTTP method to use for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {string} endpoint - The URL to which the request is sent.
 * @param {Object} data - The data to be sent as the request body. It will be stringified to JSON.
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the server.
 * @throws {Error} Throws an error if the request fails.
 */
function call(method, endpoint, data = undefined, bearer = true) {

    // Get bearer token
    const bearerToken = bearer ? getBearerToken() : '';

    // Fetch API
    return fetch(API_URL + endpoint, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(data)
    })
    .then( res =>{

        // Early return if the response doesn't have content
        if (res.status === 204 || res.status === 205)
            return null;

        // Return data
        if (res.ok)
            return res.json();

        // Invalid token / expired session
        if (res.status === 498)
            redirectToLogin();

        // Get the message
        return res.json()
            .then( error => {
                throw new Error(error.message);
            });

        
    })
    .catch( err => {
        throw new Error(err.message)
    });

}

/**
 * Performs a GET request to the specified endpoint.
 * @param {string} endpoint 
 * @param {boolean} auth 
 * @returns 
 */
export function GET(endpoint, auth = true) {
    return call('GET', endpoint, undefined, auth);
}

/**
 * Performs a POST request to the specified endpoint.
 * @param {string} endpoint 
 * @param {Object} data 
 * @returns 
 */
export function POST(endpoint, data, auth = true) {
    return call('POST', endpoint, data, auth);
}

/**
 * Performs a DELETE request to the specified endpoint.
 * @param {string} endpoint 
 * @returns 
 */
export function DELETE(endpoint) {
    return call('DELETE', endpoint);
}