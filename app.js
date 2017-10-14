const express = require('express')
const app = express()
const path = require('path');

const birds = require('./birds');
const mw = require('./logger');

app.set('view engine', 'pug');
app.set('views', './views')

app.use(express.static('public'));
app.use('/birds', birds);
app.use('/test', mw({'option': 'some value'}));

app.get('/', function (req, res) {
  //res.send('path is ' + path.join(__dirname, 'public'));
  res.render('index', {title: "Hey", message: "Hello there !!!"});
});

app.all('/test', function(req, res, next){
  console.log('Logging test requests');
  req.key1 = "My key set from ALL";
  next();
});

app.get('/test/:id', function (req, res) {
  res.json(req.params);
});

app.post('/test', function (req, res) {
  res.send(req.params);
});


app.get('/mm', function(req, res, next) {
  console.log('step 1');
  next();
}, function(req, res, next) {
  console.log('step 2');
  next();
});

app.get('/mm', function(req, res) {
  console.log('step 3');
  res.send('done');
});


app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send('Something broke !');
});

app.get('/err', function(res, req) {
  throw 'Error from /err';
  res.send('error happend');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});