// src/services/dataService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/data'; // Update with your backend API URL

export const fetchData = () => {
    return axios.get(API_URL);
};
