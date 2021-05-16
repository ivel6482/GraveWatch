const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer') // ????
const {
	createPerson,
	deletePerson,
	getAllPersons,
	getPersonById,
	getPersonsSubmittedByUser,
	updatePerson,
} = require('../controllers/persons')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.route('/').post(ensureAuth, createPerson).get(getAllPersons)
router
	.route('/:id')
	.get(getPersonById)
	.put(ensureAuth, updatePerson)
	.delete(ensureAuth, deletePerson)
router.get('/user', ensureAuth, getPersonsSubmittedByUser)

module.exports = router
