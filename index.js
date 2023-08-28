const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'page', 'homepage.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'page', 'signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'page', 'login.html'));
});

app.get('/board', (req, res) => {
    res.sendFile(path.join(__dirname, 'page', 'boardpage.html'));
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'error', '404.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
