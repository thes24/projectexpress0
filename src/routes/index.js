const path = require('path');
const express = require('express');
const router = express.Router();

router.use('/js', express.static(path.join(__dirname, '..', '..', 'dist')));
router.use('/css', express.static(path.join(__dirname, '..', 'css')));
router.use('/img', express.static(path.join(__dirname, '..', 'img')));
router.use('/fonts', express.static(path.join(__dirname, '..', 'fonts')));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'page', 'homepage.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'page', 'signup.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'page', 'login.html'));
});

router.get('/memberall', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'page', 'memberall.html'));
});

router.get('/mypage', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'page', 'goodpage.html'));
});

router.get('/board', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'page', 'boardpage.html'));
});

router.get('/board/write', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'page', 'boardwrite.html'));
});

router.get('/board/read', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'page', 'boardread.html'));
});

router.get('/board/update', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'page', 'boardupdate.html'));
});

module.exports = router;