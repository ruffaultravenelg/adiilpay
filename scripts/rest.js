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
async function call(method, endpoint, data){

    // Get bearer token
    const bearerToken = getBearerToken();

    // Fetch API
    const response = await fetch(API_URL + endpoint, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(data)
    });

    // Throw error if failed
    if (!response.ok){
        const error = await response.json();
        throw new Error(error.error);
    }

    // Return JSON
    return await response.json();

}

/**
 * Performs a GET request to the specified endpoint.
 * @param {string} endpoint 
 * @returns 
 */
export async function GET(endpoint){
    return call('GET', endpoint);
}