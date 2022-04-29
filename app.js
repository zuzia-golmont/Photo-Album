const express = require('express');
const app = express();
const fs = require('fs');

const photoData=JSON.parse(fs.readFileSync("./photoData.json", "utf8"));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    app.render('home', {photoData:photoData}, function(err, html){
        res.send(html);
    });
});

app.get('/profile', (req, res) => {
    const numberOfPhotos = 8;
    app.render('profile', {numberOfPhotos:numberOfPhotos}, function(err, html){
        res.send(html);
    });
});

app.get('/logoff', (req, res) => {
    app.render('logoff', function(err, html){
        res.send(html);
    });
});

app.get('/:photoIndex', (req, res) => {
    app.render('photo', {data:photoData[req.params.photoIndex], index:req.params.photoIndex}, function(err, html){
        res.send(html);
    });
});

app.get('/empty/:index', (req, res) => {
    app.render('empty', {index:req.params.index}, function(err, html){
        res.send(html);
    });
});


app.listen('8000');