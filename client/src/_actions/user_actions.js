import axios from 'axios';
import {
    AUTH_USER
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}




