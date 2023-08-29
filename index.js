const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const router = require('./src/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'src', 'error', '404.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
