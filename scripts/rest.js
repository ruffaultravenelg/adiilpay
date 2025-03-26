// Import auth module to get bearer token
import { getBearerToken } from './auth.js';

// API base url
const API_URL = 'https://api.adiilpay.com/v1'

/**
 * Makes an asynchronous HTTP request using the Fetch API.
 *
 * @param {string} method - The HTTP method to use for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {string} endpoint - The URL to which the request is sent.
 * @param {Object} data - The data to be sent as the request body. It will be stringified to JSON.
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the server.
 * @throws {Error} Throws an error if the request fails.
 */
async function call(method, endpoint, data = undefined, bearer = true) {

    // Get bearer token
    const bearerToken = bearer ? getBearerToken() : '';

    // Fetch API
    const response = await fetch(API_URL + endpoint, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(data)
    });

    // Early return if the response doesn't have content
    if (response.status === 204 || response.status === 205) {
        return null;
    }

    // If the response is ok, return it
    if (response.ok)
        return await response.json();

    // Get the message
    const error = await response.json();
    
    // Invalid token / expired session
    if (response.status === 498){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
        throw new Error('Invalid token');
    }

    // Throw an error with the message
    throw new Error(error.message);

}

/**
 * Performs a GET request to the specified endpoint.
 * @param {string} endpoint 
 * @param {boolean} auth 
 * @returns 
 */
export async function GET(endpoint, auth = true) {
    return call('GET', endpoint, undefined, auth);
}

/**
 * Performs a POST request to the specified endpoint.
 * @param {string} endpoint 
 * @param {Object} data 
 * @returns 
 */
export async function POST(endpoint, data, auth = true) {
    return call('POST', endpoint, data, auth);
}

/**
 * Performs a DELETE request to the specified endpoint.
 * @param {string} endpoint 
 * @returns 
 */
export async function DELETE(endpoint) {
    return call('DELETE', endpoint);
}