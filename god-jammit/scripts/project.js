//https://stackoverflow.com/questions/31174698/unable-to-prevent-an-input-from-submitting-when-press-the-enter-key-on-it
var id = document.URL.split('/');
var socket = io();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    socket.emit('create', id[3], user.displayName);
  }
});

socket.on('owner', function(owner) {
    $('#owner').val(owner);
});

socket.on('collabs', function(users) {
    var collabs = "";
    var names = Object.keys(users);
    for (var i = 0; i < names.length; i++) {
        if (names != "owner") {
            collabs += users[names[i]];
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
        $('#users').append('<h4>' + users[names[i]] + '</h4>');
        //$('#users').append('<div>' + users[names[i]] + '</div>');
    }
});

socket.on('alert', function(new_user) {
    $('#users').append('<h4>' + new_user + '</h4>');
    var users = $('#collaborators');
});

socket.on('remove', function(users) {
    $('#users').empty();
    var names = Object.keys(users);
    for (var i = 0; i < names.length; i++) {
        $('#users').append('<h4>' + users[names[i]] + '</h4>');
    }
});

socket.on('leave', function() {
    window.open("/", "_self");
});

socket.on('no_pub', function() {
    $('#publish').hide();
    $('#record').hide();
});

socket.on('send_note', function(note, key) {
    console.log("got note");
    // note has to be converted to a number
    console.log(note);
    if (key == 144)
        noteOn(note);
    else
        noteOff();
});

socket.on('recording', function() {
    $('#ready').html("Recording");
    $('#ready').removeClass("btn-warning");
    $('#ready').addClass("btn-danger");
});
/*
socket.on('show_ready', function() {

});
*/

$(document).ready(function() {
    $(document).keypress(function(key) {
        if (key.keyCode == 13) {
            key.preventDefault();
        }
    });
    $('#id').val(id[3]);
    $('#ready').click(function() {
        $('#ready').html("Waiting");
        $('#ready').removeClass("btn-success");
        $('#ready').addClass("btn-warning");
        socket.emit('ready');
    });
    $('#record').click(function() {
        $('#record').html("Stop");
        $('#record').removeClass("btn-danger");
        $('#record').addClass("btn-secondary");
        socket.emit('record');
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
