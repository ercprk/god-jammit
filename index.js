const express = require('express')
const path = require('path')
const pug = require('pug')
const uuid = require('uuid');
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'god-jammit')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .set('view engine', 'pug')
  .get('/', (req, res) => res.render('god-jammit/index.html'))
  //.get('/new_project', (req, res) => res.render('newProject', { title: "What's up", message: 'YEET!' }))
  .get('/:id', (req, res) => res.render('newProject', {title: "Test", message: "Under maintenance! :)"}))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

/*
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://god-jammit.firebaseio.com"
});
*/
