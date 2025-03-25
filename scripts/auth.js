// Imports
import { POST } from './rest.js';

/**
 * Try to get the bearer token from local storage. If it doesn't exist, redirect to the login page.
 * @returns {string} The bearer token from local storage.
 */
export function getBearerToken(){
    const bearerToken = localStorage.getItem('bearerToken');
    if (!bearerToken)
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    return bearerToken;
}

/**
 * Tries to login, return error message if failed, otherwise redirect to the path.
 * @param {string} login
 * @param {string} password 
 */
export async function login(login, password, redirectPath){

    // Save bearer token
    const { token, id, organization } = await POST(`/login`, { login, password }, false);
    localStorage.setItem('bearerToken', token);
    
    //TODO: Remove in prod
    organization.primary_color = '';
    organization.secondary_color = '';

    // Save user id
    localStorage.setItem('id', id);
    localStorage.setItem('org_id', organization.id);
    localStorage.setItem('org_name', organization.name ? organization.name : 'Organisation');
    localStorage.setItem('org_primary', organization.primary_color ? organization.primary_color : '');
    localStorage.setItem('org_secondary', organization.secondary_color ? organization.secondary_color : '');

    // Redirect to the path
    window.location.href = redirectPath ? redirectPath : '/dashboard.html';

    // Stop all scripts to wait for the page href to change
    await new Promise(resolve => {});
}

/**
 * Logout the user and redirect to the login page.
 */
export function logout(){
    localStorage.removeItem('bearerToken');
    window.location.href = '/login';
}

/**
 * Check if the user is connected.
 * @returns {boolean} True if the user is connected, false otherwise.
 */
export function isConnected(){
    return localStorage.getItem('bearerToken') !== null;
}