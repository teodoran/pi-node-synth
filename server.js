/*jslint node: true, nomen: true, unparam: true, es5: true */

'use strict';
var express = require('express'), // server dep
    shell = require('shelljs'),// run shell commands. fixed win->linux cmds.
    url = require('url'),// url routing.

    port = 3000,
    app = express(); // express object init. used to build the server.

// get the default route.
app.get('/', function (req, res) {

    // '/?C will play a C note. ?Db plays a D flat note'
    var note = url.parse(req.url).query; // do not regex to hell.

    // new shell process: do note playoff udp style.
    shell.exec('play -qn synth 2 pluck ' + note, {async:true});

    // http response: I god you covered!
    res.status(200).send('Playing a note on the server!');
});

app.listen(port); // server init.
console.log('Synth started at http://localhost:' + port + '/');
