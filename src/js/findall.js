const myjs = require('./zcommon.js');
const swaxios = require('./zaxios.js');

const main = () => {
    myjs.loginCheck();

    swaxios.get('/api/member/find-all')
    .then(function (res) {
        console.log(res);
        return res.data;
    })
    .then(function (data) {
        var boardTest = document.querySelector('#board-test');
        boardTest.innerHTML = '';

        for (var i = 0; i < data.length; ++i) {
            console.log(data[i]);

            var outerDiv = document.createElement('div');
            var inner1 = document.createElement('span');
            var inner2 = document.createElement('span');
            var inner3 = document.createElement('span');

            inner1.textContent = `memberId: ${data[i].memberId}`;
            inner1.classList.add('element');
            inner2.textContent = `memberEmail: ${data[i].memberEmail}`;
            inner2.classList.add('element');
            inner3.textContent = `memberName: ${data[i].memberName}`;
            inner3.classList.add('element');

            outerDiv.appendChild(inner1);
            outerDiv.appendChild(inner2);
            outerDiv.appendChild(inner3);
            boardTest.appendChild(outerDiv);
        }
    })
    .catch(function (err) {
        console.log(err);
    });
}

window.onload = main;