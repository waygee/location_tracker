// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LocationSchema   = new Schema({
	name: String,
	location: {
		type: [Number], // [<longitude>, <latitude>]
		index: '2d'
	},
	type: String,
	distance: Number
});

module.exports = mongoose.model('Location', LocationSchema);
