navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
     for (var input of midiAccess.inputs.values()){
        input.onmidimessage = getMIDIMessage;
        console.log('just played a note');
    }
}

function onMIDIFailure() {
    console.log('Error: Could not access MIDI devices.');
}


function getMIDIMessage(ev) {
    socket.emit('receive_note', "hi Jackie");
    console.log(ev);
    console.log('emitted');
    /*
    socket.emit('receive_note', function (){
        console.log ('inside socket emit function');
        return "hi jackie";});
    /*
    var cmd = ev.data[0] >> 4;
    var channel = ev.data[0] & 0xf;
    var noteNumber = ev.data[1];
    var velocity = 0;
    if (ev.data.length > 2)
      velocity = ev.data[2];

    // MIDI noteon with velocity=0 is the same as noteoff
    if ( cmd==8 || ((cmd==9)&&(velocity==0)) ) { // noteoff
      noteOff( noteNumber );
    } else if (cmd == 9) { // note on
      noteOn( noteNumber, velocity);
    } else if (cmd == 11) { // controller message
      controller( noteNumber, velocity);
    } else {
      // probably sysex!
    }
    /*

    var command = message.data[0];
    var note = message.data[1];
    var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
    var delay = 0;
    switch (command) {
        case 144: // noteOn
            if (velocity > 0) {

//NOTE IS PLAYED

    MIDI.loadPlugin({
        soundfontUrl: "./soundfont/",
        instrument: "acoustic_grand_piano",
        onprogress: function(state, progress) {
            console.log(state, progress);
        },
        onsuccess: function() {

            // play the note
            MIDI.setVolume(0, 127);
            MIDI.noteOn(0, note, velocity, delay);

        }
    });


            }
//NOT IS RELEASED
            else {
               window.onload = function () {
    MIDI.loadPlugin({
        soundfontUrl: "./soundfont/",
        instrument: "acoustic_grand_piano",
        onprogress: function(state, progress) {
            console.log(state, progress);
        },
        onsuccess: function() {

            // play the note
            MIDI.setVolume(0, 127);

            MIDI.noteOff(0, note, delay + 0.75);
        }
    });
};

            }
            break;
        case 128: // noteOff
          {
            window.onload = function () {
    MIDI.loadPlugin({
        soundfontUrl: "./soundfont/",
        instrument: "acoustic_grand_piano",
        onprogress: function(state, progress) {
            console.log(state, progress);
        },
        onsuccess: function() {

            // play the note
            MIDI.setVolume(0, 127);

            MIDI.noteOff(0, note, delay + 0.75);
        }
    });
};

          }
            break;
        // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
    }
    */
}
