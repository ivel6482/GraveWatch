const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide a name'],
		},
		email: {
			type: String,
			unique: true,
			required: [true, 'Please provide and email'],
		},
		password: {
			type: String,
			required: [true, 'Please provide a password'],
			min: [8, 'Password must be 8 characters or more'],
			select: false,
		},
	},
	{ timestamps: true }
)

UserSchema.pre('save', function save(next) {
	const user = this
	if (!user.isModified('password')) {
		return next()
	}
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err)
		}
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err)
			}
			user.password = hash
			next()
		})
	})
})

UserSchema.methods.comparePassword = function comparePassword(
	candidatePassword,
	cb
) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		cb(err, isMatch)
	})
}

module.exports = mongoose.model('User', UserSchema)
