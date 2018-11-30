const express = require('express')
const path = require('path')
const pug = require('pug')
const PORT = process.env.PORT || 5000
var admin = require('firebase-admin');
var serviceAccount = require("./god-jammit-firebase-adminsdk-w7yum-a61e9bd5f0.json/");

express()
  .use(express.static(path.join(__dirname, 'god-jammit')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .set('view engine', 'pug')
  .get('/', (req, res) => res.render('god-jammit/index.html'))
  .get('/new_project', (req, res) => res.render('newProject', { title: "What's up", message: 'YEET!' }))
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
