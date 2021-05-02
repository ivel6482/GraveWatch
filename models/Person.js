const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
  },
  picture: {
    type: String,
    // default: '/uploads/placeholder.png', // example
    // required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['missing', 'found', 'deceased', 'kidnapped'],
    default: 'missing',
  },
  hairColor: {
    type: String,
		default: 'Unknown',
  },
  lastSeenDate: {
    type: Date,
		default: 'Unknown',
  },
  lat: {
    type: String,
    required: true,
  },
  lon: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  height: {
    type: String,
		default: 'Unknown',
  },
  dateOfBirth: {
    type: Date,
		default: 'Unknown',
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
	createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true })

module.exports = mongoose.model('Person', PersonSchema)

