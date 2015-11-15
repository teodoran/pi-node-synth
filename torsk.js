/**
 * Created by kiro on 14/11/15.
 */


if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

var socket = io();

playSequence = function () {
    var value = document.getElementById('chordSequence').value;
    var res = value.split("");

    res = transformToArray(res);

    socket.emit('playSequence', res);
};

stopSequence = function () {
    socket.emit('stopSequence');
};

play = function (chord) {
    socket.emit('play', chord);
};

playChord = function (chord) {
    socket.emit('chord', chord);
};

transformToArray = function ( res ) {
    // transform strings to arrays, so we gat a nice format.
    // str: 'aefg' -> [ [a], [e], [f], [g] ]
    var out;
    for ( var note in res ) {
        if ( typeof res[note] === 'string' ) {
            out = [ res[note].toUpperCase() ];
        } else {
            out = res[note];
        }
        res[note] = out;
    }
    return res;
};

drums = function(){
    var pattern = [[], [], [], [], [], [], [], []];
    var notes = ['kick', 'snare', 'clap', 'hihat', 'crash'];
    for (var j = 0; j <= 7; j++){
        for (var i = 0; i <= 4; i++){
            var name = notes[i],
                checked = document.getElementById(name+"-"+(j+1)).checked;
            if( checked ){
                pattern[j].push(notes[i]);
            }
        }
    }
    socket.emit('playDrumSequence', pattern);
};
