/*jslint node: true, nomen: true, es5: true*/

'use strict';
var shell = require('shelljs');

var Sequencer = function () {
    var self = this,
		
		running = false,
		bpm = 120,
	    sounds = {},
		pattern = [],
		playCmd = 'play -q ',

		timeout = function (bpm) {
			return (60 * 1000) / (bpm * 2);
		},

		play = function (sound) {
			var command = playCmd + sounds[sound];

			shell.exec(command, {async: true, silent: true});
		},

		playPattern = function (pattern) {
			if (!pattern) { return; };

			pattern.forEach(function (sound) {
				play(sound);
			});
		},

		run = function (i) {
			if (!running) { return; };
			var i = i % pattern.length || 0;

			playPattern(pattern[i]);
			setTimeout(function () {
				run(i + 1);
			}, timeout(bpm));
		};

	self.bpm = function (newBpm) {
		bpm = newBpm;
		return self;
	};

	self.sounds = function (newSounds) {
		sounds = newSounds;
		return self;
	};

	self.pattern = function (newPattern) {
		pattern = newPattern;
		return self;
	};

	self.playCmd = function (newPlayCmd) {
		playCmd = newPlayCmd;
		return self;
	};

	self.start = function () {
		if (!running) {
			running = true;
			run();
		};
		return self;
	};

	self.stop = function () {
		running = false;
		return self;
	}
};

exports.Sequencer = Sequencer;
