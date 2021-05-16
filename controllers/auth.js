const passport = require('passport')
const User = require('../models/User')

exports.login = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return next(err)
		}
		if (!user) {
			res.json({ message: 'No user found', error: info })
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err)
			}
			req.flash('success', { msg: 'You are logged in.' })
			// res.redirect(req.session.returnTo || '/profile')
			res.json(user)
		})
	})(req, res, next)
}

exports.logout = (req, res) => {
	req.logout()
	req.session.destroy((err) => {
		if (err) {
			console.error('Error: Failed to destroy the session during logout', err)
		}
		req.user = null
		res.json({ message: 'Logged out' })
	})
}

exports.signup = (req, res, next) => {
	const { name, email, password, confirmPassword } = req.body
	if (password !== confirmPassword) {
		return res.json({ message: 'Passwords do not match' })
	}

	const user = new User({
		name,
		email,
		password,
	})

	User.findOne({ email }, (err, existingUser) => {
		if (err) {
			return next(err)
		}
		if (existingUser) {
			return res.json({ message: 'User already exists.' })
		}

		user.save((err) => {
			if (err) {
				return next(err)
			}
			req.logIn(user, (err) => {
				if (err) {
					return next(err)
				}
				res.json(user)
			})
		})
	})
}
