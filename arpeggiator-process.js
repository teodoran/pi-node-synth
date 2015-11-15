var Sequencer = require('./sequencer').Sequencer,
	sequencer = new Sequencer()
		.bpm(100)
		.playCmd('play -qn synth 2 pluck ')
		.sounds({
			'A': 'A',
			'B': 'B',
			'C': 'C',
			'D': 'D',
			'E': 'E',
			'F': 'F',
			'G': 'G'
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