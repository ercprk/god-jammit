const express = require('express')
const path = require('path')
const pug = require('pug')
const PORT = process.env.PORT || 5000
var admin = require('firebase-admin');
/*
var admin = require('firebase-admin');
var serviceAccount = require("./god-jammit-firebase-adminsdk-w7yum-a61e9bd5f0.json/");
*/

express()
  .use(express.static(path.join(__dirname, 'god-jammit')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .set('view engine', 'pug')
  .get('/', (req, res) => res.render('god-jammit/index.html'))
  .get('/new_project', (req, res) => res.render('newProject', { title: "What's up", message: 'YEET!' }))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'god-jammit',
    clientEmail: 'firebase-adminsdk-w7yum@god-jammit.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDU1wn6YNAWV4ZT\n5fkH/+1mokTIUa1cv/Tjs9C5CQd3USVhd9iNxWOse2SC/84rmjoiYaQRQRJ4JozZ\nwOPrWLrpmQV21JTYhwDNhQUQo2eTPd7iClZPuhRzaNwXbL005HNruMb9hXbnz/5z\nRYqT7X30lOYVIJqQX+qOFfImnnNl4ctmXeMWvU2cmNjH//AIOpOmqrYTo4BqXey1\ni9t5oZAXnzz0vF/1twsKGa1+Eoki32asv+J0m/ejVjkISVZSXAjqT0S33beSpBxL\n23/t2OKURVq2v4SuqHFR0V9HDvq7mtNHsl+t5uWU+jEkXyLsRECb8EI/beWKS5Mr\n3TfXk+cPAgMBAAECggEAJ6xNt9YD86Ys68aaPNt/rPniSFSxM/Cz/R2vck40jhEa\nHqjwPLzmb2gwvBpim84LuAzrQCwY/TxyVMSXt266qIBVfGjztci0ZZq97vQGgnOt\n8ARtQj81QK3zGIq0Wf+bZCD1NpyCJYOnsmTsB9bk+4oluRpytSar2gBNOtWePQca\nP11Jt7YwlpGi4bunIjYtlh76NPTf+ZLHrnotTTHb+8irzIK9yz06ieKECaHFodXZ\nabzVfGfQD63JRKqh5hot6R+3sg6+lUf3WTzABptlUUDm1zakt6BaPPyEtElGIaMV\nTLV8jSHb0lcDVuDG8tYVroaIjLydTzUjaV3iezDrAQKBgQD+3TJjoxbaxPQfMcOt\nl/XBNmeMUOK1zkb+P4y6hJKy/HwbCEa+vLoSczOguVuzZRb7yLhGNE0h3Ai2/36A\nty6pNF92YW76OoxSihZEL2vj7M9uBEG7R3fciVne8IVHhOA4K3iDquEdyhFsNtfF\ntDE9AmANu9CLaLjPihK36VqGPwKBgQDVyeRkWwH6ic7GQfBL3yQifBHeEZE+Ue5V\niehqvGkIvn9ZI6WHcm2tgFPnS7ewR69eqTi/bnfQwnxuCGAScoVONLqk5CDv48Zh\nnyYbpw0EbKc2IATUViamnBDdXcoGz0OY72fE0kUhu20Xymdjg5QXyezvNOEKFR2w\nuA+oeqSLMQKBgFqRTku78+4wGTRQoeG5Y3qSk794KuhCclX9TUwmul7ifFO64DD9\nrf3KdGlEFUMtxDobPOitw08p+urU5iZlci5szxOpUh+X2K+oJHt8gpGPYLMOzjD4\nF68GHCquPB6LKIatY/keKztDyGc1If4+p1Sv2GRo/pXb0/jkbvxt715PAoGAMgmV\n7jMqzGPyxI5sWqW4hGW7nNlJwGdWvCiSAGFmyAgmMEvak1AiAYjWmn0rWhP9JM/A\nm3WUj4TlsK8/JTIupzZKNQu79cm/BdxFBBXeQxnXLSDjYHtlgntmqxknjt51+NaX\n2AZK7fE7QGU8O5txTvwQ+4/J2B1HHLSH3awO1RECgYA4FOM8ppijW1BdA4GBvuKW\n6P0fpz30ThsGVKwc5rifQCf4R3K/LpPmTDwx6GILDo9FyuoafUzlbqg9DRDYdqF/\n3G42k0k2XNdIqdfZt5E9u2Sp23UQyxaPBZSpjTKzsGo6KK090N/7UqKoWAFRgbvM\nHQky0gIaGi5ZfXGKAnNCqg==\n-----END PRIVATE KEY-----\n'
  }),
  databaseURL: 'https://god-jammit.firebaseio.com'
});
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


