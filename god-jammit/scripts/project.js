//https://stackoverflow.com/questions/31174698/unable-to-prevent-an-input-from-submitting-when-press-the-enter-key-on-it
var id = document.URL.split('/');
var socket = io();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $(document).ready(function() {
        $('#owner').val(user.displayName);
        socket.emit('create', id[3], user.displayName);
    });
  }
});

socket.on('update', function(users) {
    var names = Object.keys(users);
    for (var i = 0; i < names.length; i++) {
        console.log('<h4>' + users[names[i]] + '</h4>');
        $('#users').append('<h4>' + users[names[i]] + '</h4>');
    }
});

socket.on('alert', function(new_user) {
    $('#users').append('<h4>' + new_user + '</h4>');
});

socket.on('remove', function(users) {
    $('#users').empty();
    var names = Object.keys(users);
    for (var i = 0; i < names.length; i++) {
        console.log('<h4>' + users[names[i]] + '</h4>');
        $('#users').append('<h4>' + users[names[i]] + '</h4>');
    }
});

$(document).ready(function() {
    $(document).keypress(function(key) {
        if (key.keyCode == 13) {
            key.preventDefault();
        }
    });
    $('#id').val(id[3]);
});

//https://stackoverflow.com/questions/639815/how-to-disable-all-div-content
firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
      $(document).ready(function() {
        $('#fun').addClass('disabled');
      });
  }
});
