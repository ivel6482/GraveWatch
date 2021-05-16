const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide a name.'],
		},
		picture: {
			type: String,
			// default: '/uploads/placeholder.png', // example
			// required: true,
		},
		description: {
			type: String,
			required: [true, 'Please provide a description'],
			trim: true,
		},
		status: {
			type: String,
			required: true,
			enum: ['missing', 'found', 'deceased'],
			default: 'missing',
		},
		hairColor: {
			type: String,
			default: 'Unknown',
		},
		lastSeenDate: {
			type: Date,
		},
		lat: {
			type: String,
			required: [true, 'Please provide a latitude'],
		},
		lon: {
			type: String,
			required: [true, 'Please provide a longitude'],
		},
		gender: {
			type: String,
			enum: ['male', 'female', 'other', 'unknown'],
			default: 'unknown',
			required: [true, 'Please provide a gender'],
		},
		height: {
			type: String,
			default: 'Unknown',
		},
		dateOfBirth: {
			type: Date,
		},
		eyeColor: {
			type: String,
			default: 'Unknown',
		},
		placeOfBirth: {
			type: String,
			default: 'Unknown',
		},
		weight: {
			type: String,
			default: 'Unknown',
		},
		race: {
			type: String,
			default: 'Unknown',
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		cloudinaryId: {
			type: String,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Person', PersonSchema)
