const myjs = require('./zcommon.js');
const swaxios = require('./zaxios.js');

const createTableCell = (text) => {
    const cell = document.createElement('td');
    cell.textContent = text;
    return cell;
};

const main = () => {
    myjs.loginCheck();

    swaxios.get('/api/member/find-all')
    .then(function (res) {
        console.log(res);
        return res.data;
    })
    .then(function (data) {
        const tableBody = document.querySelector('.member-table tbody');

        data.forEach(function (member) {
            const row = document.createElement('tr');

            const noCell = createTableCell(member.memberId);
            row.appendChild(noCell);

            const titleCell = document.createElement('td');
            const titleLink = document.createElement('a');
            titleLink.href = `/member/${member.memberId}`;
            titleLink.textContent = member.memberEmail;
            titleCell.appendChild(titleLink);
            row.appendChild(titleCell);

            const authorCell = createTableCell(member.memberPassword);
            row.appendChild(authorCell);

            const timeUpdatedCell = createTableCell(member.memberName);
            row.appendChild(timeUpdatedCell);

            tableBody.appendChild(row);
        });
    })
    .catch(function (err) {
        console.log(err);
    });
}

window.onload = main;