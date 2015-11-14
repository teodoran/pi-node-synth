/*jslint node: true, nomen: true, unparam: true, es5: true */

'use strict';
var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	url = require('url'),
	shell = require('shelljs'),
	
	port = 3000,
	chords = {
		'C': ['C3', 'E3', 'G3'],
		'Dm': ['D3', 'F3', 'A3'],
		'Em': ['E3', 'G3', 'B3'],
		'F': ['F3', 'A3', 'C3'],
		'G': ['G3', 'B3', 'D3'],
		'Am': ['A3', 'C3', 'E3']
	},

	drums = {
		'clap': __dirname + '/samples/clap-808.wav',
		'crash': __dirname + '/samples/crash-noise.wav',
		'hihat':__dirname + '/samples/hihat-electro.wav',
		'kick': __dirname + '/samples/kick-808.wav',
		'snare': __dirname + '/samples/snare-smasher.wav'
	};

app.use('/static', express.static(__dirname + '/node_modules'));
app.use('/torsk.css', express.static(__dirname + '/torsk.css'));
app.use('/torsk.js', express.static(__dirname + '/torsk.js'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/chords', function (req, res) {
    res.sendFile(__dirname + '/chords.html');
});

app.get('/drums', function (req, res) {
    res.sendFile(__dirname + '/drums.html');
});

app.get('/sequence', function (req, res) {
    res.sendFile(__dirname + '/sequence.html');
});

io.on('connection', function (socket){
    console.log('a user connected');

    socket.on('play', function (msg) {
        var command = 'play -qn synth 2 pluck ' + msg;

        shell.exec(command, {async: true});
    });

    socket.on('chord', function (msg) {
        var chord = chords[msg],
            command = 'play -qn synth sin ' + chord[0] + ' sin ' + chord[1] + ' sin ' + chord[2] + ' delay 0 .01 .02 remix - fade 0 2 .1 norm -1';

        shell.exec(command, {async: true});
    });

    socket.on('beat', function (msg) {
        var drum = drums[msg],
            command = 'play -q ' + drum;

        shell.exec(command, {async: true, silent: true});
    });

    socket.on('playSequence', function (msg) {
        console.log(msg);
        // todo play sequences. 
    });

    socket.on('disconnect', function() {
        console.log('a user disconnected');
    });
});

app.get('/api', function (req, res) {
    // '/?C will play a C note. ?Db plays a D flat note'
    var note = url.parse(req.url).query;

    shell.exec('play -qn synth 2 pluck ' + note, {async: true});
    res.status(200).send('Playing a note on the server!');
});

http.listen(port, function () {
    console.log('Synth started at http://localhost:' + port + '/');
});
