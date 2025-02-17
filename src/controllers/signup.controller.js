import bcrypt from "bcrypt"
import { cloudinaryUpload } from "../utils/cloudinaryUpload.utils.js"
import { User } from "../models/user.model.js"

const saltrounds = Number(process.env.BCRYPT_SALT_ROUND)

export const signupController = async (req, res) => {

	const { fullName, email, password, phoneNumber, gender } = req.body

	if ([fullName, email, password, phoneNumber, gender].some(el => el?.trim() === '')) {
		res.status(401).json({
			success: false,
			message: 'Missing required fields: fullname, email, password, phoneNumber and gender are required'
		})
	}

	const existingUser = await User.findOne({ email })
	if (existingUser) {
		return res.status(409).json({
			success: false,
			message: `Sorry, user already exists with ${email} !!!`
		});
	}

	const hashedPassword = await bcrypt.hash(password, saltrounds)

	const userData = {
		fullName,
		email,
		password: hashedPassword,
		phoneNumber,
		gender
	}

	if (req.file) {
		const fileName = req.file.filename
		const filePath = req.file.path
		try {
			const cloudinaryUploadData = await cloudinaryUpload(fileName, filePath)
			userData.profileImage = cloudinaryUploadData.secure_url
		} catch (uploadError) {
			return res.status(500).json({
				success: false,
				message: 'Failed to upload profile image'
			});
		}
	}

	try {
		const saveUserData = await User(userData)
		saveUserData.save()

		res.status(200).json({
			success: true,
			message: "User registration successful",
			data: {
				id: saveUserData._id,
				name: saveUserData.fullName,
				email: saveUserData.email
			}
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "User registration unsuccessful"
		})
	}

}