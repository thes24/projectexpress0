const myjs = require('./zcommon.js');
const swaxios = require('./zaxios.js');

const main = () => {
    myjs.loginCheck();

    var submitBtn = document.querySelector('#login');
    submitBtn.addEventListener('click', function() {
        var memberEmail = document.querySelector('#member-email').value;
        var memberPassword = document.querySelector('#member-password').value;
        swaxios.post('/api/member/login', {
            memberEmail,
            memberPassword,
        })
        .then(function (res) {
            console.log('success', res);
            return res.data;
        })
        .then(function (data) {
            console.log('data', data);
            if ('referrer' in document) {
                window.location = document.referrer;
            } else {
                window.location.href = '/';
            }
        })
        .catch(function (err) {
            console.log('err', err);
        });
    })
}

window.onload = main;