//https://stackoverflow.com/questions/31174698/unable-to-prevent-an-input-from-submitting-when-press-the-enter-key-on-it
var id = document.URL.split('/');
var socket = io();
/*var funcMidiVisualizer = require("func-midi-visualizer");

const initMidiVisualizer = import 'midi-visualizer';*/

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        socket.emit('create', id[3], user.displayName);
    }
});

socket.on('owner', function(owner) {
    $('#owner').val(owner.name);
});

socket.on('collabs', function(users) {
    var collabs = "";
    var names = Object.keys(users);
    for (var i = 0; i < names.length; i++) {
        if (names[i] != "owner") {
            collabs += users[names[i]].name;
            if (i != names.length - 1) {
                collabs += ", ";
            }
        }
    }
    $('#collaborators').val(collabs);
});

socket.on('update', function(users) {
    var names = Object.keys(users);
    for (var i = 0; i < names.length; i++) {
        $('#users').append('<h4 id=' + names[i] + '>' + users[names[i]].name + '</h4>');
        if (users[names[i]].ready == true) {
            $('#users').find('#' + names[i]).css('color', 'green');
        }
    }
});

socket.on('alert', function(new_user, id) {
    $('#users').append('<h4 id=' + id + '>' + new_user + '</h4>');
});

socket.on('remove', function(users) {
    $('#users').empty();
    var names = Object.keys(users);
    for (var i = 0; i < names.length; i++) {
        $('#users').append('<h4 id=' + names[i] + '>' + users[names[i]].name + '</h4>');
        if (users[names[i]].ready == true) {
            $('#users').find('#' + names[i]).css('color', 'green');
        }
    }
});

socket.on('leave', function() {
    window.open("/", "_self");
});

socket.on('no_pub', function() {
    $('#publish').hide();
    $('#record').hide();
});

var piano = SampleLibrary.load({
    instruments: "piano"
});

socket.on('send_keynote', function(note) {
    // WORK ON VISUALIZER HERE
    piano.toMaster();
    piano.triggerAttack(note);
});
socket.on('midi', function(note) {
    console.log("note is received");
});

socket.on('recording', function() {
    $('#record').html("Stop");
    $('#record').removeClass("btn-danger");
    $('#record').addClass("btn-secondary");
    $('#ready').html("Recording");
    $('#ready').removeClass("btn-warning");
    $('#ready').addClass("btn-danger");
});
socket.on('not_ready', function() {
    alert("Not everyone is ready!");
});
socket.on('show_finish', function() {
    $('#ready').html("Finished!");
    $('#ready').removeClass("btn-danger");
    $('#ready').addClass("btn-primary");
});
socket.on('show_ready', function(id) {
    $('#users').find('#' + id).css('color', 'green');
});
socket.on('check', function() {
    if ($('#ready').html() == "Finished!") {
        var check = confirm("Are you ready to publish?");
        socket.emit('send', check);
    }
    else {
        alert("You didn't finish recording!");
    }
});
socket.on('submit', function() {
    $('#song_finish').submit();
});

$(document).ready(function() {
    $(document).keypress(function(key) {
        if (key.keyCode == 13) {
            key.preventDefault();
        }
    });
    $('#id').val(id[3]);
    $('#ready').click(function() {
        if ($('#ready').html() == "Ready") {
            $('#ready').html("Waiting");
            $('#ready').removeClass("btn-success");
            $('#ready').addClass("btn-warning");
            socket.emit('ready');
        }
    });
    $('#record').click(function() {
        if ($('#record').html() == "Record") {
            socket.emit('record');
        }
        else {
            $('#record').hide();
            socket.emit('finish');
        }
    });
    $('#publish').click(function() {
        socket.emit('publish');
    });
});

//https://stackoverflow.com/questions/639815/how-to-disable-all-div-content
firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        $(document).ready(function() {
            $('#fun').addClass('disabled');
        });
    }
});
