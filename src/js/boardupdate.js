const myjs = require('./zcommon.js');
const swaxios = require('./zaxios.js');

const main = () => {
    myjs.loginCheck();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const boardId = parseInt(urlParams.get('id'));

    const bdButton = document.getElementById('board');
    bdButton.addEventListener('click', function() {
        window.location.href = '/board';
    });

    swaxios.get(`/api/board/find-id/${boardId}`)
    .then(function (res) {
        console.log(res);
        return res.data;
    })
    .then(function (data) {
        document.querySelector('#board-title').value = data.boardTitle;
        document.querySelector('#board-content').value = data.boardContent;
    })
    .catch(function (err) {
        console.error(err);
    });

    const uptButton = document.getElementById('update');
    uptButton.addEventListener('click', async function() {
        const enteredPassword = prompt('Enter the board password:');

        const response = await swaxios.get(`/api/board/find-id/${boardId}`);
        const bdata = response.data;

        if (enteredPassword === bdata.boardPassword) {

            const updatedTitle = document.querySelector('#board-title').value;
            let updatedPassword = document.querySelector('#board-password').value;
            if (updatedPassword == '') {
                updatedPassword = bdata.boardPassword;
            }
            const updatedContent = document.querySelector('#board-content').value;
            const boardWriter = await myjs.getMemberName();

            await swaxios.put(`/api/board/update/${boardId}`, {
                boardId: boardId,
                boardWriter,
                boardPassword: updatedPassword,
                boardTitle: updatedTitle,
                boardContent: updatedContent,
            })
            .then(function (res) {
                console.log('Board updated succesfully', res);
                return res.data;
            })
            .then(function (data) {
                console.log('data', data);
                window.location.href = '/board';
            })
            .catch(function (err) {
                console.error('error', err);
            });
        } else {
            alert('Incorrect password. Update denied.');
            window.location.href = '/board';
        }
    })
};

window.onload = main;
