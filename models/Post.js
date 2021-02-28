const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
	user: {
		type: Schema.Types.Object,
		ref: "users",
		required: true
	},
	text: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('posts', postSchema)

