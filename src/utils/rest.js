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
async function call(method, endpoint, data = undefined, bearer = true) {
    const bearerToken = bearer ? getBearerToken() : '';

    try {
        const res = await fetch(API_URL + endpoint, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(bearerToken && { 'Authorization': `Bearer ${bearerToken}` }),
            },
            body: data ? JSON.stringify(data) : undefined,
        });
        
        // No content
        if (res.status === 204 || res.status === 205) return null;

        // Redirect if token expired
        if (res.status === 498) {
            redirectToLogin();
            return;
        }

        const result = await res.json().catch(() => null); // handle invalid JSON

        if (!res.ok) {
            // throw structured error
            const message = result ? (result.details ? result.details[0] : result.message) : 'Une erreur est survenue';
            throw {
                status: res.status,
                message: message,
            };
        }

        return result;

    } catch (error) {
        //throw error;
        throw {
            message: error?.message || 'Une erreur est survenue',
        };
    }
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