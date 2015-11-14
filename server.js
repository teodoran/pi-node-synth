/*jslint node: true, nomen: true, unparam: true, es5: true */

'use strict';
var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	url = require('url'),
	shell = require('shelljs'),
	port = 3000;

app.use('/static', express.static(__dirname + '/node_modules'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket){
	console.log('a user connected');

	socket.on('play', function (msg) {
		shell.exec('play -qn synth 2 pluck ' + msg, {async: true});
	})

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
