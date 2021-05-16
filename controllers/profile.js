const Person = require('../models/Person')

module.exports = {
	getIndex: async (req, res) => {
		try {
			const UsersPersons = await Person.find({ user: req.user._id })
			res.render('profile.ejs', {
				persons: UsersPersons,
				user: req.user,
				leaflet: true,
			})
		} catch (err) {
			console.error(err)
		}
	},
}
