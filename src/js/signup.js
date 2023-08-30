const myjs = require('./zcommon.js');
const swaxios = require('./zaxios.js');

function emailCheck(email) {
    return swaxios.post('api/member/check-email', { memberEmail : email })
        .then(res => {
            return res.status == 200;
        })
}

const main = () => {
    myjs.loginCheck();

    var submitBtn = document.querySelector('#signup');
    submitBtn.addEventListener('click', async function() {
        var memberEmail = document.querySelector('#member-email').value;
        var memberPassword = document.querySelector('#member-password').value;
        var memberPasswordCheck = document.querySelector('#member-password-check').value;
        var memberName = document.querySelector('#member-name').value;

        if (memberEmail == '' || memberPassword == '' || memberPasswordCheck == '' || memberName == '') {
            alert('Please fill in all required fields.');
            return;
        }

        const isEmailAvailable = await emailCheck(memberEmail);

        if (!isEmailAvailable) {
            alert('Email already in use. Please choose a different email.');
            return;
        }

        if (memberPassword !== memberPasswordCheck) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        swaxios.post('api/member/signup', {
            memberEmail,
            memberPassword,
            memberName,
        })
        .then(function (res) {
            console.log('signup success', res);
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
            console.log('error', err);
        });
    })
}

window.onload = main;