/*jslint node: true, nomen: true, unparam: true, es5: true */

'use strict';
var express = require('express'),
    shell = require('shelljs'),
    url = require('url'),

    port = 3000,
    app = express();

// Server routes
app.get('/', function (req, res) {
    var note = url.parse(req.url).query;

    shell.exec('play -qn synth 2 pluck ' + note, {async:true});
    res.status(200).send('Playing a note on the server!');
});

// Start server on given port
app.listen(port);
console.log('Synth started at http://localhost:' + port + '/');