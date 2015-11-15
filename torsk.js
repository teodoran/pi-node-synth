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
    console.log("sequence!");
    var value = document.getElementById('chordSequence').value;
    console.log(value);
    var res = value.split("");

    res = transformToArray(res);

    socket.emit('playSequence', res);
};

stopSequence = function () {
    socket.emit('stopSequence');
};

play = function (chord) {
    console.log("play!");
    socket.emit('play', chord);
};

playChord = function (chord) {
    console.log("chord!");
    socket.emit('chord', chord);
};

transformToArray = function ( res ) {
    // transform strings to arrays, so we gat a nice format.
    // str: 'aefg' -> [ [a], [e], [f], [g] ]
    var out;
    for ( var note in res ) {
        if ( typeof res[note] === 'string' ) {
            //console.log("not an array");
            out = [ res[note].toUpperCase() ];
        } else {
            //console.log("already an array");
            out = res[note];
        }
        //console.log(out);
        res[note] = out;
    }
    return res;
};

