const Person = require('../models/Person')
const User = require('../models/User')
const cloudinary = require('../middleware/cloudinary')

exports.getAllPersons = async (req, res) => {
	try {
		const persons = await Person.find()
		const count = await Person.countDocuments()

		if (persons.length === 0) {
			return res.json({ message: 'No persons' })
		}

		res.json({ count, persons })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server Error' })
	}
}
exports.getPersonsSubmittedByUser = async (req, res) => {
	try {
		const persons = await Person.find({ user: req.user._id })
		if (persons) {
			res.json(persons)
		} else {
			res.status(404).json({ message: 'Persons submitted by user not found' })
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.createPerson = async (req, res) => {
	try {
		const {
			name,
			description,
			status,
			hairColor,
			lastSeenDate,
			lat,
			lon,
			gender,
			height,
			dateOfBirth,
			eyeColor,
			placeOfBirth,
			weight,
			race,
		} = req.body
		// const result = await cloudinary.uploader.upload(req.file.path)
		const person = await Person.create({
			name,
			description,
			status,
			hairColor,
			lastSeenDate,
			lat,
			lon,
			gender,
			height,
			dateOfBirth,
			eyeColor,
			placeOfBirth,
			weight,
			race,
			user: req.user,
		})

		res.json(person)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server Error' })
	}
}
exports.getPersonById = async (req, res) => {
	const { id } = req.params
	try {
		const person = await Person.findById(id).populate('user')
		if (person) {
			res.json(person)
		} else {
			res.status(404).json({ message: 'Person not found' })
		}
	} catch (e) {
		console.error(e)
		res.status(500).json({ message: 'Server Error' })
	}
}
exports.updatePerson = async (req, res) => {
	try {
		const { id } = req.params
		console.log(id)
		console.log(req.body)
		const person = await Person.findOneAndUpdate({ _id: id }, req.body, {
			new: true,
		})
		res.json(person)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server Error' })
	}
}
exports.deletePerson = async (req, res) => {
	try {
		const { id } = req.params
		const person = await Person.findById(id)
		// await cloudinary.uploader.destroy(person.cloudinaryId)
		if (person) {
			await Person.remove(person)
			res.json({ message: `${person.name} has been removed` })
		} else {
			res.status(404).json({ message: 'Person not found' })
		}
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server Error' })
	}
}
