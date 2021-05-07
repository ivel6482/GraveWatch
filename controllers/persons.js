const Person = require('../models/Person')
const User = require('../models/User')
const cloudinary = require('../middleware/cloudinary')

module.exports = {

  getAllPersons: async (req, res)=>{
    try {
      //Find function without any argument will return all
      //the records from the 'Person' collection.
      const PersonAllItems = await Person.find()
      res.render('index.ejs', {persons: PersonAllItems, user: req.user, leaflet: false})
    }catch(err){
      console.error(err)
    }
  },

  getPersons: async (req, res)=>{//filtering records
    try {
      const PersonItems = await Person.find({user: req.user._id})
      res.render('profile.ejs', {persons: PersonItems, user: req.user, leaflet: true})
    }catch(err){
      console.error(err)
    }
  },

  createPerson: async(req, res)=>{//creating new record in db
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const person = await Person.create({
        name: req.body.name,
        cloudinaryId: result.public_id,
        // picture: req.body.file,
        picture: result.secure_url,
        description: req.body.description,
        status: req.body.status,
        hairColor: req.body.hairColor,
        lastSeenDate: req.body.lastSeenDate,
        lat: req.body.lat,
        lon: req.body.lon,
        sex: req.body.sex,
        height: req.body.height,
        dateOfBirth: req.body.dateOfBirth,
        eyeColor: req.body.eyeColor,
        placeOfBirth: req.body.placeOfBirth,
        weight: req.body.weight,
        race: req.body.race,
        user: req.user
      })
      res.redirect(`/persons/${person._id}`)
    }catch(err){
      console.error(err)
    }
  },

  getPersonById: async (req, res) => {
    const { id } = req.params
    // const { id } = req.body
    try {
      const person = await Person.findById(id).populate('user')
      res.render('person.ejs', { person: person, user: req.user, leaflet: true })
    } catch(e) {
      console.error(e)
    }

  },

  getUpdate: async(req, res) => {
    const { id } = req.params
    try{
      const person = await Person.findById(id).populate('user')
      res.render('update.ejs', { person, user: req.user, leaflet: true })
    }catch(e){
      console.error(e)
    }
  },

	putPerson: async (req, res) => {
		try {
      // get the person that we want to update data
      // fill the form with that data
      // use the data from form to update that person
      // redirect to /persons/:id
			const person = await Person.findOneAndUpdate({ _id: req.params.id }, req.body)
			res.redirect(`/persons/${person._id}`)
		} catch (err) {
			console.error(err)
		}
	},

	deletePerson: async (req, res) => {
		try {
			const person = await Person.findById({ _id: req.params.id })
      await cloudinary.uploader.destroy(person.cloudinaryId)
      await Person.remove({ _id: req.params.id })
			res.redirect('/profile')
		} catch (err) {
			console.error(err)
			res.redirect('/profile')
		}
	},

}
