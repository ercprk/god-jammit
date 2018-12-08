const express = require('express')
const path = require('path')
const pug = require('pug')
const uuid = require('uuid/v4')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://god-jammit.firebaseio.com"
});

express()
  .use(express.static(path.join(__dirname, 'god-jammit')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .set('view engine', 'pug')
  .get('/', (req, res) => res.render('god-jammit/index.html'))
  .get('/project', (req, res) => res.redirect('project/' + uuid()))
  .get('/project/:id', (req, res) => res.render('newProject', {title: "Test", message: "Under maintenance! :)"}))
  .post('/search', (req, res) => res.redirect('search?search=' + req.body.search))
  .get('/search', function(req, res) {
      var collection = admin.database().ref("projects");
      collection.once('value').then(function(snap) {
              console.log(snap.val());
          })
  })
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
