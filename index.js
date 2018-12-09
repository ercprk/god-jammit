const express = require('express')
const path = require('path')
const pug = require('pug')
const uuid = require('uuid/v4')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

//---------Initializes Socket.io instance---------//


var server = require('http').createServer(express());
/*
var io = require('socket.io')(server);
*/

// Function that emits message event to clients upon connection
/*
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
*/


//---------Initializes Firebase db instance---------//
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://god-jammit.firebaseio.com"
});
var db = admin.database();


//----------Initializes Express instance-----------//
express()
//https://stackoverflow.com/questions/18165138/res-sendfile-doesnt-serve-javascripts-well
  .use(express.static(path.join(__dirname, '/god-jammit')))
  //.use('/styles', express.static(path.join(__dirname, '/god-jammit/styles')))
  //.use('/scripts', express.static(path.join(__dirname, '/god-jammit/scripts')))
  //.use('/images', express.static(path.join(__dirname, '/god-jammit/images')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
  })
  .set('views', path.join(__dirname, 'views'))
  //.engine('html', require('ejs').renderFile)
  .set('view engine', 'ejs')
  //.set('view engine', 'html')
  .set('view engine', 'pug')
  //.get('/', (req, res) => res.sendFile('project.html'))
  //https://stackoverflow.com/questions/25270434/nodejs-how-to-render-static-html-with-express-4
  .post('/', function(req, res) {
    if (JSON.parse(req.body.logged_in)) {
        res.send('/' + uuid());
    }
    else {
        res.send('/login')
    } 
  })
  .get('/login', (req, res) => res.sendFile('login.html', {root: __dirname + '/god-jammit/'}))
  .get('/:id', function(req, res) {
    res.sendFile('project.html', {root: __dirname + '/god-jammit/'});



    })
  .post('/search', function(req, res) {
      //db.ref("projects").once('value').then(function(snap) {
        //  console.log(snap.val());
      //});
      //res.sendFile('search.html', {root: __dirname + '/god-jammit/'});
      res.render('search', {result: req.body.search});
  })
  .post('/publish', function(req, res) {
      db.ref("projects/" + req.body.id).set({
          name: req.body.name,
          owner: req.body.owner,
          collaborators: ["person1", "person2"],
          made_at: Date(),
          audio: "test.mp3"
      })
      res.redirect('/')
  })
  //.post('/submit', function(req, res) {})
//https://stackoverflow.com/questions/38541098/how-to-retrieve-data-from-firebase-database
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

