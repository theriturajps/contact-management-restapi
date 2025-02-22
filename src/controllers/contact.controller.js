import { User } from "../models/user.model.js"
import { Contact } from "../models/contact.model.js"

export const getContactById = async (req, res) => {
	try {

		const userId = req.userData?.userId;

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: 'Invalid Access Token',
			});
		}

		const userData = await User.findById(userId).select("-password -whatRole -gender -email -phoneNumber -profileImage -refreshToken");

		if (!userData) {
			return res.status(404).json({
				success: false,
				message: 'Sorry!!! User not found',
			});
		}

		return res.status(200).json({
			success: true,
			message: 'Request successful',
			user: {
				id: userData._id,
				name: userData.fullName,
				contact: userData.contacts || [],
			},
		});

	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
		});
	}
};

export const createNewContent = async (req, res) => {
	const { contactName, contactNumber, contactEmail, contactPincode, contactGender, contactProfileImage } = req.body
	const userId = req.userData?.userId;

	const userData = await User.findById(userId).select("-password -whatRole -refreshToken -phoneNumber -email")

	const newContact = {
		fullName: contactName,
		email: contactEmail,
		phoneNumber: contactNumber,
		pincode: contactPincode,
		gender: contactGender,
		profileimg: contactProfileImage
	}

	try {
		const saveContact = new Contact(newContact)
		await saveContact.save()

		userData.contacts.push(saveContact)
		await userData.save()

		res.status(201).json({
			success: true,
			message: `Contact ${saveContact._id} created successfully for ${userData._id}`,
			contact: {
				userId: userData._id,
				contactId: saveContact._id
			}
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Internal Server Error',
		});
	}
}

export const deleteContact = async (req, res) => { }

export const updatedContact = async (req, res) => { }

