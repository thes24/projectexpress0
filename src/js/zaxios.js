const axios = require('axios');

let swaxios = null;

if (window.location.host == 'localhost:3000') {
    swaxios = axios.create({
        baseURL: 'http://localhost:8080',
        withCredentials: true,
    });
} else {
    swaxios = axios.create({
        baseURL: 'http://s.yeon-tae-woo.kro.kr',
        withCredentials: true,
    });
}

module.exports = swaxios;