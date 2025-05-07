import { POST } from '@/utils/rest.js';
import router from '@/router/index.js';

export default{

    /**
     * Tries to login, return error message if failed, otherwise redirect to the path.
     * @param {string} login
     * @param {string} password 
     */
    login(login, password, redirectRoute = null){

        // Save bearer token
        return POST(`/login`, { login, password }, false)
            .then( ({ token, id, organization }) => {


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
                if (typeof redirectRoute === 'string')
                    redirectRoute = JSON.parse(redirectRoute);
                router.push(redirectRoute ? redirectRoute : { name: 'dashboard' });
        
            })

    },

    /**
     * Logout the user and redirect to the login page.
     */
    logout(){
        localStorage.removeItem('bearerToken');
        router.push({ name: 'login' });
    },

    /**
     * Check if the user is connected.
     * @returns {boolean} True if the user is connected, false otherwise.
     */
    isConnected(){
        return localStorage.getItem('bearerToken') !== null;
    },

}
