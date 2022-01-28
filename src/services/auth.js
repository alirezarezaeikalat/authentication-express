const config = require('../config');
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const saltRounds = 10;

class AuthService {
	async SignUp(userInputDTO) {
		const { name, email, password } = userInputDTO;
		try {
			const user = await User.findOne({ email: email });
			if (user) {
				throw { status: 200, message: 'Email is already registered' }
			}
			const hash = await bcrypt.hash(password, saltRounds);
			const newUser = await User.create({
				name,
				email,
				password: hash
			});
			if (!newUser) {
				throw Error('User creation error');
			}
			return newUser;
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	async SignIn(email, password) {
		try {
			const userRecord = await User.findOne({ email });
			if (!userRecord) {
				throw new Error('User not registered');
			}
			const isMatch = await bcrypt.compare(password, userRecord.password)
			if (isMatch) {
				userRecord.password = undefined;
				return userRecord;
			} else {
				throw new Error('Invalid Password');
			}
		} catch (e) {
			console.log(e);
			throw e;
		}
	}


}

module.exports = AuthService