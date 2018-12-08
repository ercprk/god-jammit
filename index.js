const express = require('express')
const path = require('path')
//const engines = require('consolidate');
//const pug = require('pug')
const uuid = require('uuid/v4')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://god-jammit.firebaseio.com"
});

var db = admin.database();

express()
//https://stackoverflow.com/questions/18165138/res-sendfile-doesnt-serve-javascripts-well
  .use(express.static(path.join(__dirname, '/god-jammit')))
  //.use('/styles', express.static(path.join(__dirname, '/god-jammit/styles')))
  //.use('/scripts', express.static(path.join(__dirname, '/god-jammit/scripts')))
  //.use('/images', express.static(path.join(__dirname, '/god-jammit/images')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  //.set('views', path.join(__dirname, 'views'))
  //.engine('html', require('ejs').renderFile)
  //.set('view engine', 'ejs')
  //.engine('html', engines.mustache)
  //.set('view engine', 'html')
  //.set('view engine', 'pug')
  //.get('/', (req, res) => res.sendFile('project.html'))
  //https://stackoverflow.com/questions/25270434/nodejs-how-to-render-static-html-with-express-4
  .get('/project', (req, res) => res.redirect('project/' + uuid()))
  .get('/project/:id', (req, res) => res.sendFile('project.html', {root: __dirname + '/god-jammit/'}))
  .post('/search', (req, res) => res.redirect('search?search=' + req.body.search))
  .get('/search', function(req, res) {
      db.ref("projects").once('value').then(function(snap) {
              res.send(snap.val());
          })
  })
  .post('/publish', function(req, res) {
      db.ref("projects/" + req.body.id).set({
          name: req.body.name,
          owner: "someone",
          collaborators: ["person1", "person2"],
          made_at: Date(),
          audio: "test.mp3"
      })
  })
  //.post('/submit', function(req, res) {})
//https://stackoverflow.com/questions/38541098/how-to-retrieve-data-from-firebase-database
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
/*

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://god-jammit.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

*/
