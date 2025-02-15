import bcrypt from "bcrypt"
import { User } from "../models/user.model.js"
import { generateAccessTokens } from "../utils/generateToken.utils.js"

export const loginController = async (req, res) => {

	const { email, password } = req.body

	if ([email, password].some(el => el.trim() === '')) {
		res.status(401).json({
			success: false,
			message: 'Missing required fields: email and password are required'
		})
	}

	const userData = await User.findOne({ email })

	if (!userData) {
		return res.status(404).json({
			message: 'User not exist!! Please check the credentials.',
			success: false
		})
	}

	const userHashedPassword = userData.password

	const isPasswordMatched = await bcrypt.compare(password, userHashedPassword)

	if (!isPasswordMatched) {
		return res.status(404).json({
			message: 'Sorry!!, the password is incorrect please use correct password.',
			success: false
		})
	}

	if (email === userData.email && isPasswordMatched) {

		const accessToken = generateAccessTokens({ email: userData.email, userId: userData._id }, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRY)

		return res.status(200).json({
			success: true,
			message: `Hello ${userData.fullName}, Authentication successful!!!`,
			user: {
				id: userData._id,
				name: userData.fullName,
				email: userData.email
			},
			token: accessToken
		})
	}

}