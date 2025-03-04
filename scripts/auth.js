const API_URL = 'https://api.adiilpay.com/v1'

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
export async function login(login, password, redirectPath = '/dashboard.html'){

    // Fetch API
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    });

    // Return error message if failed
    if (!response.ok)
        throw new Error((await response.json()).error);

    // Save bearer token
    const { token, userID } = await response.json();
    localStorage.setItem('bearerToken', token);
    /*
    // Save user id
    localStorage.setItem('userid', userID);

    // Save user informations
    const { name, surname } = await GET(`/user/${userID}`);
    localStorage.setItem('firstname', firstname);
    localStorage.setItem('lastname', lastname); */

    // Redirect to the path
    window.location.href = redirectPath;

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