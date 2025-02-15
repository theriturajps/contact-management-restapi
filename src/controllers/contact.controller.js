import { User } from "../models/user.model.js"

export const getContactById = async (req, res) => {
	const userId = req.params.id
	const userData = await User.findById(userId).select('-password -whatRole -gender -email -phoneNumber -profileImage')
	if (userData.contacts.length === 0) {
		return res.status(404).json({
			success: false,
			message: 'Request successful, but no content to return',
			user: {
				id: userData._id,
				name: userData.fullName
			}
		})
	}
}

export const createNewContent = async (req, res) => { }


export const deleteContact = async (req, res) => { }


export const updatedContact = async (req, res) => { }