const express   = require('express');
const app       = express();
const path      = require('path');

const PORT      = 8080;     //default web port http://192.18.19:80




app.use('/', express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});


//starts server
app.listen(PORT, () => { console.log("Server started on port: " + PORT) });