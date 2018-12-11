$(document).click(function(event) {
    console.log('clicked');
    socket.emit('play_song', event.target.id);
});

socket.on('song_here', function(addr) {
    var audio = document.getElementById('audio');
    audio.src = addr;
    audio.play();
});
