const express = require('express');
const app = express();

const logErrors = require('./mw/logErrors');
const logXHRErrors = require('./mw/logXHRErrors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Page title',
        message: 'My message form server'
    });
});

app.get('/test', function (req, res) {
    console.log(req.body);
    console.log(req.query);
    res.json({ 'status': 'ok' });
});

app.post('/test', function (req, res) {
    console.log(req.body);
    console.log(req.query);
    console.log(req.body.asd);
    res.json({ 'status': 'ok' });
});

app.get('/err', function (req, res) {
    throw 'broke';
});

app.use(logErrors);
app.use(logXHRErrors);

app.use(function (err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
