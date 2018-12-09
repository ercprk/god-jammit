navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
     for (var input of midiAccess.inputs.values()){
        input.onmidimessage = getMIDIMessage;
    }
}

function onMIDIFailure() {
    console.log('Error: Could not access MIDI devices.');
}

// midi message event
function getMIDIMessage(ev) {
    console.log(ev["data"]["1"]);
    socket.emit('receive_note', ev["data"]["1"], ev["data"]["0"]);
    console.log('emitted');

// for keyboard, have to be able to convert to midi message


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



/*------- WEB AUDIO API --------*/

    var context = null;
    var oscillator = null;
    function getOrCreateContext() {
      if (!context) {
        context = new AudioContext();
        oscillator = context.createOscillator();
        oscillator.connect(context.destination);
      }
      return context;
    }
    const list = document.getElementById('midi-list');
    const debugEl = document.getElementById('debug');

    let isStarted = false;

var active_voices = {};

    function noteOn(midiNote) {
      getOrCreateContext();
      
      var freq = Math.pow(2, (midiNote-69)/12)*440;
      var active_voices[freq] = new oscillator;
      active_voices[freq].frequency.setTargetAtTime(freq, context.currentTime, 0);
      if (!isStarted) {
        active_voices[freq].start(0);
        isStarted = true;
      } else {
        context.resume();
      }

      //---- orig start ---//
      /*
      
      const freq = Math.pow(2, (midiNote-69)/12)*440;

      oscillator.frequency.setTargetAtTime(freq, context.currentTime, 0);
      if (!isStarted) {
        oscillator.start(0);
        isStarted = true;
      } else {
        context.resume();
      }
      */
      //---- orig end ----//\
    }

    function noteOff(midiNote) {
      /*
      active_voices[note].stop();
      delete active_voices[note];
      */
      var freq = Math.pow(2, (midiNote-69)/12)*440;
      /* writing for loop function for each */
      forn each(var osc in active_voices) {
        if (osc.frequency == freq)
          osc.oscillator.stop(0);
      }
      //context.suspend();
    }

    function connectToDevice(device) {
      console.log('Connecting to device', device);
      device.onmidimessage = function(m) {
        const [command, key, velocity] = m.data;
        if (command === 145) {
          debugEl.innerText = 'KEY UP: ' + key;
          noteOn(key);
        } else if(command === 129) {
          debugEl.innerText = 'KEY DOWN';
          noteOff(key);
        }
      }
    }

    function replaceElements(inputs) {
        // cannot read firstChild
      while(list.firstChild) {
        list.removeChild(list.firstChild)
      }
      const elements = inputs.map(e => {
            console.log(e);
            const el = document.createElement('li')
            el.innerText = `${e.name} (${e.manufacturer})`;
            el.addEventListener('click', connectToDevice.bind(null, e));
            return el;
        });

        elements.forEach(e => list.appendChild(e));
    }

    navigator.requestMIDIAccess()
        .then(function(access) {
          console.log('access', access);
          replaceElements(Array.from(access.inputs.values()));
          access.onstatechange = function(e) {
            replaceElements(Array.from(this.inputs.values()));
          }

        })


    // Below is keyboard emulation for C4-C5 q-i keys
    var emulatedKeys = {
      q: 60,
      w: 62,
      e: 64,
      r: 65,
      t: 67,
      y: 69,
      u: 71,
      i: 72,
    }

    document.addEventListener('keydown', function(e) {
      console.log(e);
      if (emulatedKeys.hasOwnProperty(e.key)) {
        noteOn(emulatedKeys[e.key]);
      }
    });

    document.addEventListener('keyup', function(e) {
      if (emulatedKeys.hasOwnProperty(e.key)) {
        noteOff(emulatedKeys[e.key]);
      }
    });





/* --- Web audio API ver 2 --- */
/*
var keyboard = qwertyHancock({id: 'keyboard'});

var context = new AudioContext();

active_voices = {};

keyboard.keyDown(function (note, frequency) {
  var voice = new Voice(frequency);
    active_voices[note] = voice;
    voice.start();
});

keyboard.keyUp(function (note, _) {
    active_voices[note].stop();
    delete active_voices[note];
});


/--VCO --/
var vco = context.createOscillator();
vco.type = vco.SINE;
vco.frequency.value = this.frequency;
vco.start(0);

/---CA--/
var vca = context.createGain();
vca.gain.value = 0;

/--Connections--/
vco.connect(vca);
vca.connect(context.destination);

    // Parameters for voice //
 var Voice = (function(context) {
    function Voice(frequency){
      this.frequency = frequency;
    };

    // Start function
    Voice.prototype.start = function() {
      /- VCO -/
      var vco = context.createOscillator();
      vco.type = vco.SINE;
      vco.frequency.value = this.frequency;

      /- VCA -/
      var vca = context.createGain();
      vca.gain.value = 0.3;

      /- connections -/
      vco.connect(vca);
      vca.connect(context.destination);

      vco.start(0);
    };

    // Stop function
    Voice.prototype.stop = function() {
      this.oscillators.forEach(function(oscillator, _) {
        oscillator.stop();
      });
    };

    return Voice;
})(context);
*/
