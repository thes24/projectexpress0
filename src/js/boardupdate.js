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
        const updatedTitle = document.querySelector('#board-title').value;
        const updatedPassword = document.querySelector('#board-password').value;
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
            if (res.status == 200) {
                console.log('Board updated succesfully', res);
                return res.data;
            } else {
                console.error('Board update denied', err);
                alert('Incorrect password. Please try again.');
            }
        })
        .then(function (data) {
            console.log('data', data);
            window.location.href = '/board';
        })
        .catch(function (err) {
            console.error('error', err);
        });
    })
};

window.onload = main;
