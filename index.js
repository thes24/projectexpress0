const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/abc', (req, res) => {
    res.sendFile(__dirname + "/hrsc/401.html")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})