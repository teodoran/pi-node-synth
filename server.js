/*jslint node: true, nomen: true, unparam: true, es5: true */

'use strict';
var express = require('express'),
    shell = require('shelljs'),
    url = require('url'),

    port = 3000,
    app = express();

app.get('/', function (req, res) {
	// '/?C will play a C note. ?Db plays a D flat note'
    var note = url.parse(req.url).query;

    shell.exec('play -qn synth 2 pluck ' + note, {async:true});
    res.status(200).send('Playing a note on the server!');
});

app.listen(port);
console.log('Synth started at http://localhost:' + port + '/');