const myjs = require('./zcommon.js');
const swaxios = require('./zaxios.js');

const createTableCell = (text) => {
    const cell = document.createElement('td');
    cell.textContent = text;
    return cell;
};

const main = () => {
    myjs.loginCheck();

    const newButton = document.getElementById('New');
    newButton.addEventListener('click', function() {
        window.location.href = '/board/write';
    });

    swaxios.get('api/board/find-all')
    .then(function (res) {
        console.log(res);
        return res.data;
    })
    .then(function (data) {
        const tableBody = document.querySelector('.board-table tbody');

        let rowNumber = 1;

        data.forEach(function (board) {
            const row = document.createElement('tr');

            const noCell = createTableCell(rowNumber);
            noCell.setAttribute('id', board.boardId);
            rowNumber++;
            row.appendChild(noCell);

            const titleCell = document.createElement('td');
            const titleLink = document.createElement('a');
            titleLink.href = `/board/read?id=${board.boardId}`;
            titleLink.textContent = board.boardTitle;
            titleCell.appendChild(titleLink);
            row.appendChild(titleCell);

            const authorCell = createTableCell(board.boardWriter);
            row.appendChild(authorCell);

            const timeUpdatedCell = createTableCell(board.updateDateTime);
            row.appendChild(timeUpdatedCell);

            const timeCreatedCell = createTableCell(board.createDateTime);
            row.appendChild(timeCreatedCell);

            tableBody.appendChild(row);
        });
    })
    .catch(function (err) {
        console.error(err);
    });
};

window.onload = main;
