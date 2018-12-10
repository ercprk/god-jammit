const express = require('express')
const app = express();
const path = require('path')
const pug = require('pug')
const uuid = require('uuid/v4')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

//---------Initializes Socket.io instance---------//

var server = require('http').Server(app);
var io = require('socket.io')(server);

//---------Initializes Firebase db instance---------//
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://god-jammit.firebaseio.com"
});
var db = admin.database();


//----------Initializes Express instance
//https://stackoverflow.com/questions/18165138/res-sendfile-doesnt-serve-javascripts-well
app.use(express.static(path.join(__dirname, '/god-jammit')));
  //.use('/styles', express.static(path.join(__dirname, '/god-jammit/styles')))
  //.use('/scripts', express.static(path.join(__dirname, '/god-jammit/scripts')))
  //.use('/images', express.static(path.join(__dirname, '/god-jammit/images')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 });
app.set('views', path.join(__dirname, 'views'));
  //.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');
  //.set('view engine', 'html')
app.set('view engine', 'pug');


  //.get('/', (req, res) => res.sendFile('index.html', {root: __dirname + '/god-jammit/'}))
  //https://stackoverflow.com/questions/25270434/nodejs-how-to-render-static-html-with-express-4
app.post('/', function(req, res) {
    if (JSON.parse(req.body.logged_in)) {
        res.send('/' + uuid());
    }
    else {
        res.send('/login')
    }
});
app.get('/login', (req, res) => res.sendFile('login.html', {root: __dirname + '/god-jammit/'}));
app.get('/:id', function(req, res) {
    res.sendFile('project.html', {root: __dirname + '/god-jammit/'});
});
app.post('/search', function(req, res) {
      db.ref("projects").orderByChild("made_at").once('value', function(snapshot) {
        var results = {};
        var songs = snapshot.val();
        var keys = Object.keys(songs);
        for (var i = 0; i < keys.length; i++) {
            if (songs[keys[i]]["name"].includes(req.body.search))
                results[keys[i]] = songs[keys[i]];
        }
        res.render('search', {"result": req.body.search, "songs": results});
      });
      //res.sendFile('search.html', {root: __dirname + '/god-jammit/'});
  });
app.post('/publish', function(req, res) {
      db.ref("projects/" + req.body.id).set({
          "name": req.body.name,
          "owner": req.body.owner,
          "collaborators": req.body.collaborators,
          "made_at": Date(),
          "audio": req.body.audio
      })
      res.redirect('/')
  });
  //.post('/submit', function(req, res) {})
  var rooms = {};
  var users;
  // Function that emits message event to clients upon connection
  io.on('connection', function(socket) {
    socket.on('create', function(room, name) {
        socket.join(room);
        if (rooms[room] == null || rooms[room] == {}) {
            rooms[room] = {};
            rooms[room]["owner"] = { "name": name, "ready": false };
        }
        else {
            rooms[room][socket.id] = { "name": name, "ready": false };
            socket.emit("no_pub");
        }
        console.log(name + " has joined " + room);
        socket.emit('owner', rooms[room]['owner']);
        socket.broadcast.to(room).emit('collabs', rooms[room]);
        socket.emit('update', rooms[room]);
        socket.broadcast.to(room).emit('alert', name, socket.id);

        // Recieves MIDI from a client and sends it to everyone including client
        socket.on('receive_note', function(note, key) {
            console.log("note played");
            io.in(room).emit('send_note', note, key);
        });
        socket.on('record', function() {
            var ready = true;
            var names = Object.keys(rooms[room]);
            for (var i = 0; i < names.length; i++) {
                if (rooms[room][names[i]].ready == false) {
                    ready = false;
                }
            }
            if (ready) {
                io.in(room).emit('recording');
            }
            else {
                socket.emit('not_ready');
            }
        });
        socket.on('ready', function() {
            if (!Object.keys(rooms[room]).includes(socket.id)) {
                rooms[room]["owner"].ready = true;
                io.in(room).emit('show_ready', "owner");
            }
            else {
                rooms[room][socket.id].ready = true;
                io.in(room).emit('show_ready', socket.id);
            }
        });
        socket.on('finish', function() {
            io.in(room).emit('show_finish');
        });
        socket.on('publish', function() {
            // compile MIDI
            socket.emit('check');
        });
        socket.on('send', function(sure) {
            if (sure) {
                socket.emit('submit');
            }
        });

        socket.on('disconnect', function() {
            console.log(name + " has left " + room);
            if (!Object.keys(rooms[room]).includes(socket.id) && Object.keys(rooms[room]).length != 1) {
                console.log("Owner has left!");
                var clients = io.sockets.adapter.rooms[room].sockets;
                socket.broadcast.to(room).emit('leave');
            }
            else {
                delete rooms[room][socket.id];
                io.in(room).emit('remove', rooms[room]);
            }
        });
    });
  });

//https://stackoverflow.com/questions/38541098/how-to-retrieve-data-from-firebase-database
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));
/*
var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});
*/
