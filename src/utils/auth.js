// Imports
import router from '@/router/index.js';

/**
 * Try to get the bearer token from local storage. If it doesn't exist, redirect to the login page.
 * @returns {string} The bearer token from local storage.
 */
export function getBearerToken(){
    const bearerToken = localStorage.getItem('bearerToken');
    if (!bearerToken)
        redirectToLogin();
        
    return bearerToken;
}

/**
 * Redirect to the login page with the current route as a query parameter.
 */
export function redirectToLogin(){
    router.push({ name: 'login' });
}