const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	login: {
		type: String,
		required: true
	},
	password: {
		type: String
	},
	avatar: {
		type: String
	},
	followers: [],
	following: []
})

module.exports = mongoose.model('users', userSchema);