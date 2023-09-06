const myjs = require('./zcommon.js');
const swaxios = require('./zaxios.js');

const main = async () => {
    myjs.loginCheck();

    const memberId = await myjs.getMemberId();

    swaxios.get(`/api/member/find-id/${memberId}`)
    .then(function (res) {
        console.log(res);
        return res.data;
    })
    .then(function (data) {
        const idHead = document.getElementById('id');
        const idCell = document.createElement('td');
        idCell.textContent = data.memberId;
        idHead.appendChild(idCell);

        const emailTable = document.getElementById('email');
        const emailCell = document.createElement('td');
        emailCell.textContent = data.memberEmail;
        emailTable.appendChild(emailCell);

        const passTable = document.getElementById('password');
        const passCell = document.createElement('td');
        passCell.textContent = data.memberPassword;
        passTable.appendChild(passCell);

        const nameTable = document.getElementById('name');
        const nameCell = document.createElement('td');
        nameCell.textContent = data.memberName;
        nameTable.appendChild(nameCell);
    })
    .catch(function (err) {
        console.error(err);
    });
};

window.onload = main;
