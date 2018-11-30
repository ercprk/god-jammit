const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
/*
var admin = require('firebase-admin');
var serviceAccount = require("./god-jammit-firebase-adminsdk-w7yum-a61e9bd5f0.json/");
*/

express()
  .use(express.static(path.join(__dirname, 'god-jammit')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('god-jammit/index.html'))
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