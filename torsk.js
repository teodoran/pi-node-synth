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
    for ( var chord in res ) {
        if ( typeof res[chord] === 'string' ) {
            //console.log("not an array");
            out = [ res[chord] ];
        } else {
            //console.log("already an array");
            out = res[chord];
        }
        //console.log(out);
        res[chord] = out;
    }
    return res;
};

