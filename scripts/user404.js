// Imports
import { isConnected } from './auth.js';

// HTML Elements
const dashboard_btn = document.getElementById('dashboard_btn');

// Display dashboard button if admin is connected
dashboard_btn.style.display = isConnected() ? '' : 'none';

// Redirect to dashboard
dashboard_btn.onclick = () => {
    window.location.href = '/dashboard';
};