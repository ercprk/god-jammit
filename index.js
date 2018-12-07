const express = require('express')
const path = require('path')
const pug = require('pug')
const uuid = require('uuid/v4');
const PORT = process.env.PORT || 5000
const admin = require('firebase-admin');
//const serviceAccount = require("./god-jammit-firebase-adminsdk-w7yum-a61e9bd5f0.json/");


express()
  .use(express.static(path.join(__dirname, 'god-jammit')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .set('view engine', 'pug')
  .get('/', (req, res) => res.render('god-jammit/index.html'))
  .get('/project', (req, res) => res.redirect("project/" + uuid()))
  .get('/project/:id', (req, res) => res.render('newProject', {title: "Test", message: "Under maintenance! :)"}))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

/*
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://god-jammit.firebaseio.com"
});
*/
