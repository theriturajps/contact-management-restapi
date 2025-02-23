import { User } from "../models/user.model.js"
import { Contact } from "../models/contact.model.js"

export const getAllContact = async (req, res) => {
	try {
		const userId = req.userData?.userId;

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: 'Invalid Access Token',
			});
		}

		const userData = await User.findById(userId).select("-profileimg -createdAt -updatedAt -__v -password -whatRole -gender -email -phoneNumber -profileImage -refreshToken");

		if (!userData) {
			return res.status(404).json({
				success: false,
				message: 'Sorry!!! User not found',
			});
		}

		const allContacts = await Promise.all(
			userData.contacts.map(contact => Contact.findById(contact).select("-createdAt -updatedAt -__v"))
		);

		return res.status(200).json({
			success: true,
			message: 'Request successful',
			user: {
				userId: userData._id,
				userFullName: userData.fullName
			},
			contacts: allContacts
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

	const userId = req.userData?.userId;

	const userData = await User.findById(userId).select("-password -whatRole -refreshToken -phoneNumber -email")

	const newContact = {
		fullName: req.body.contactName,
		phoneNumber: req.body.contactNumber,
		email: req.body.contactEmail,
		pincode: req.body.contactPincode,
		gender: req.body.contactGender,
		profileimg: req.body.contactProfileImage || "https://res.cloudinary.com/dgsigmemf/image/upload/v1739280154/user-image/default.png"
	}

	try {
		const saveContact = new Contact(newContact)
		await saveContact.save()

		userData.contacts.push(saveContact._id)
		await userData.save()

		res.status(201).json({
			success: true,
			message: `Contact created successfully for ${userData._id}`,
			contact: {
				id: saveContact._id,
				name: saveContact.fullName,
				phoneNumber: saveContact.phoneNumber,
				email: saveContact.email,
				pincode: saveContact.pincode
			}
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Internal Server Error : ' + error.message,
		});
	}
}

export const deleteContact = async (req, res) => {
	const userId = req.userData?.userId;
	const contactId = req.params.id;

	try {
		if (!userId) {
			return res.status(401).json({
				success: false,
				message: 'Invalid Access Token',
			});
		}

		const userData = await User.findById(userId).select("-password -whatRole -refreshToken -phoneNumber -email")

		if (!userData) {
			return res.status(404).json({
				success: false,
				message: 'Sorry!!! User not found',
			});
		}

		if (!userData.contacts.includes(contactId)) {
			return res.status(404).json({
				success: false,
				message: `Sorry!!! Contact with ID ${contactId} not found`,
			});
		}

		const deletedContact = await Contact.findByIdAndDelete(contactId)
		const DeletedUserContact = await User.findByIdAndUpdate(userId, { $pull: { contacts: contactId } })

		res.json({
			success: true,
			message: `Contact with ID ${contactId} deleted successfully.`,
			deletedContactDetails: {
				id: deletedContact._id,
				name: deletedContact.fullName,
				phoneNumber: deletedContact.phoneNumber
			}
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}

}

export const updatedContact = async (req, res) => { }

