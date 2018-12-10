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

var midiToTone = {
  21: "A0",
  22: "As0",
  23: "B0",
  24: "C1",
  25: "Cs1",
  26: "D1",
  27: "Ds1",
  28: "E1",
  29: "F1",
  30: "Fs1",
  31: "G1",
  32: "Gs1",
  33: "A1",
  34: "As1",
  35: "B1",
  36: "C2",
  37: "Cs2",
  38: "D2",
  39: "Ds2",
  40: "E2",
  41: "F2",
  42: "Fs2",
  43: "G2",
  44: "Gs2",
  45: "A2",
  46: "As2",
  47: "B2",
  48: "C3",
  49: "Cs3",
  50: "D3",
  51: "Ds3",
  52: "E3",
  53: "F3",
  54: "Fs3",
  55: "G3",
  56: "Gs3",
  57: "A3",
  58: "As3",
  59: "B3",
  60: "C4",
  61: "Cs4",
  62: "D4",
  63: "Ds4",
  64: "E4",
  65: "F4",
  66: "Fs4",
  67: "G4",
  68: "Gs4",
  69: "A4",
  70: "As4",
  71: "B4",
  72: "C5",
  73: "Cs5",
  74: "D5",
  75: "Ds5",
  76: "E5",
  77: "F5",
  78: "Fs5",
  79: "G5",
  80: "Gs5",
  81: "A5",
  82: "As5",
  83: "B5",
  84: "C6",
  85: "Cs6",
  86: "D6",
  87: "Ds6",
  88: "E6",
  89: "F6",
  90: "Fs6",
  91: "G6",
  92: "Gs6",
  93: "A6",
  94: "As6",
  95: "B6",
  96: "C7",
  97: "Cs7",
  98: "D7",
  99: "Ds7",
  100: "E7",
  101: "F7",
  102: "Fs7",
  103: "G7",
  104: "Gs7",
  105: "A7",
  106: "As7",
  107: "B7",
  108: "C8"
}

// midi message event
function getMIDIMessage(ev) {
    console.log(ev["data"][1]);
    if (midiToTone.hasOwnProperty(ev["data"][1]) && ev["data"][0] == 144) {
        socket.emit('receive_keynote', midiToTone[ev["data"][1]]);
      //socket.emit('receive_note', emulatedKeys[e.key], 144);
    }
    //socket.emit('receive_note', ev["data"]["1"], ev["data"]["0"]);
    //console.log('emitted');

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

      /*
      var freq = Math.pow(2, (midiNote-69)/12)*440;
      var active_voices[freq] = context.createOscillator();
      active_voices[freq].connect(context.destination);
      active_voices[freq].frequency.setTargetAtTime(freq, context.currentTime, 0);
      if (!isStarted) {
        active_voices[freq].start(0);
        isStarted = true;
      } else {
        context.resume();
      }
      */

      //---- orig start ---//      /*

      const freq = Math.pow(2, (midiNote-69)/12)*440;

      oscillator.frequency.setTargetAtTime(freq, context.currentTime, 0);
      if (!isStarted) {
        oscillator.start(0);
        isStarted = true;
      } else {
        context.resume();
      }
      //---- orig end ----//\
    }

    function noteOff(midiNote) {
      /*
      active_voices[note].stop();
      delete active_voices[note];
      */
      var freq = Math.pow(2, (midiNote-69)/12)*440;
      /*
      forn each(var osc in active_voices) {
        if (osc.frequency == freq)
          osc.oscillator.stop(0);
      }
      */
      context.suspend();
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
      q: "C4",
      w: "D4",
      e: "E4",
      r: "F4",
      t: "G4",
      y: "A4",
      u: "B4",
      i: "C5",
      o: "D5",
      p: "E5"
    }

    document.addEventListener('keydown', function(e) {
      if (emulatedKeys.hasOwnProperty(e.key)) {
          socket.emit('receive_keynote', emulatedKeys[e.key]);
        //socket.emit('receive_note', emulatedKeys[e.key], 144);
      }
    });
/*
    document.addEventListener('keyup', function(e) {
      //if (emulatedKeys.hasOwnProperty(e.key)) {
        //socket.emit('receive_note', emulatedKeys[e.key], 128);
     // }
    });
*/




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
