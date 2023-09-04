const myjs = require('./zcommon.js');
const swaxios = require('./zaxios.js');

const main = () => {
    myjs.loginCheck();

    const bdButton = document.getElementById('board');
    bdButton.addEventListener('click', function() {
        window.location.href = '/board';
    });

    const wrtButton = document.getElementById('write');
    wrtButton.addEventListener('click', async function() {
        const boardWriter = await myjs.getMemberName();
        let boardPassword = document.querySelector('#board-password').value;
        let boardTitle = document.querySelector('#board-title').value;
        let boardContent = document.querySelector('#board-content').value;

        swaxios.post('/api/board/write', {
            boardWriter,
            boardPassword,
            boardTitle,
            boardContent,
        })
        .then(function (res) {
            console.log('Board write succesfully', res);
            return res.data;
        })
        .then(function (data) {
            console.log('data', data);
            window.location.href = '/board';
        })
        .catch(function (err) {
            console.error('error', err);
        });
    });
};

window.onload = main;
