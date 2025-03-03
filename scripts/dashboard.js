// Imports
import { GET } from './rest.js';

const users = GET('/user');
console.log(users);