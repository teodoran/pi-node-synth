var Sequencer = require('./sequencer').Sequencer,
	sequencer = new Sequencer()
		.bpm(100)
		.sounds({
			'clap': __dirname + '/samples/clap-808.wav',
			'crash': __dirname + '/samples/crash-noise.wav',
			'hihat':__dirname + '/samples/hihat-electro.wav',
			'kick': __dirname + '/samples/kick-808.wav',
			'snare': __dirname + '/samples/snare-smasher.wav'
		});

process.on('message', function(msg) {
	if (msg.bpm) {
		sequencer.bpm(msg.bpm);
	};
	if (msg.pattern) {
		sequencer.pattern(msg.pattern);
	};
	if (msg.start) {
		sequencer.start();
	};
	if (msg.stop) {
		sequencer.stop();
	};
});