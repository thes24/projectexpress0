const axios = require('axios');

const swaxios = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

module.exports = swaxios;