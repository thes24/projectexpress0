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

    let submitBtn = document.querySelector('#signup');
    submitBtn.addEventListener('click', async function() {
        let memberEmail = document.querySelector('#member-email').value;
        let memberPassword = document.querySelector('#member-password').value;
        let memberPasswordCheck = document.querySelector('#member-password-check').value;
        let memberName = document.querySelector('#member-name').value;

        if (memberEmail == '' || memberPassword == '' || memberPasswordCheck == '' || memberName == '') {
            alert('Please fill in all required fields.');
            return;
        }

        if (memberPassword !== memberPasswordCheck) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        try {
            const isEmailAvailable = await emailCheck(memberEmail);
        } catch (err) {
            alert('Email already in use. Please choose a different email.');
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