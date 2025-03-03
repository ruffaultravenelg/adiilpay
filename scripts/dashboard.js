// Imports
import { GET } from './rest.js';

const users = await GET('/user');
console.log(users);