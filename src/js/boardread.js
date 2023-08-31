const myjs = require('./zcommon.js');
const swaxios = require('./zaxios.js');

const main = async () => {
    myjs.loginCheck();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const boardId = parseInt(urlParams.get('id'));

    const uptButton = document.getElementById('update');
    uptButton.addEventListener('click', function() {
        window.location.href = '/board/update';
    });

    const dltButton = document.getElementById('delete');
    dltButton.addEventListener('click', function() {
        swaxios.delete(`/api/board/delete/${boardId}`)
        .then(function(res) {
            console.log("Board deleted successfully");
            window.location.href = '/board/find-all';
            return res.data
        })
        .catch(function(err) {
            console.error(err);
        });
    });

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
        const tableHead = document.querySelector('.read-form thead tr');
        const titleCell = document.createElement('td');
        titleCell.textContent = data.boardTitle;
        tableHead.appendChild(titleCell);

        const authorTable = document.getElementById('author');
        const authorCell = document.createElement('td');
        authorCell.textContent = data.boardWriter;
        authorTable.appendChild(authorCell);

        const updateTimeTable = document.getElementById('uptime');
        const updateTimeCell = document.createElement('td');
        updateTimeCell.textContent = data.updateDateTime;
        updateTimeTable.appendChild(updateTimeCell);

        const contentTable = document.getElementById('content');
        const contentCell = document.createElement('td');
        contentCell.textContent = data.boardContent;
        contentTable.appendChild(contentCell);
    })
    .catch(function (err) {
        console.error(err);
    });
};

window.onload = main;
