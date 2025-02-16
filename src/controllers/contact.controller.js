import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { Contact } from "../models/contact.model.js"

export const getContactById = async (req, res) => {

	const token = req.cookies?.accessToken

	const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

	const userId = decodedToken?.userId

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized request',
		})
	}

	const userData = await User.findById(userId).select("-password -whatRole -gender -email -phoneNumber -profileImage -refreshToken")

	if (!userData) {
		return res.status(401).json({
			success: false,
			message: 'Invalid Access Token',
		})
	}

	if (userData.contacts) {
		return res.status(200).json({
			success: true,
			message: 'Request successful',
			user: {
				id: userData.userId,
				name: userData.fullName,
				contact: userData.contacts
			}
		})
	}
}

export const createNewContent = async (req, res) => {
	const userId = req.params.id
	const userData = await User.findById(userId).select('-password -whatRole -gender -email -phoneNumber -profileImage -refreshToken')

	if (!userData) {
		return res.status(404).json({
			message: 'User not exist!! Please check the credentials.',
			success: false
		})
	}

	const { fullName, email, phoneNumber, pincode, gender, profileimg } = req.body

	const userContact = { fullName, email, phoneNumber, pincode, gender, profileimg }

	try {
		const saveContact = new Contact(userContact)
		await saveContact.save()
		const contactId = saveContact._id
		userData.contacts.push(contactId)
		await userData.save()

		res.status(200).json({
			success: true,
			message: `Hello ${userData.fullName}, Contact created successfully!!!`,
			user: {
				id: userData._id,
			},
			contact: {
				id: contactId,
			}
		})

	} catch (error) {
		return res.status(404).json({
			success: false,
			message: 'Failed to create contact'
		});
	}


}

export const deleteContact = async (req, res) => { }

export const updatedContact = async (req, res) => { }