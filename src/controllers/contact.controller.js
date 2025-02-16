import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { Contact } from "../models/contact.model.js"
import { generateAccessTokens, generateRefreshTokens } from "../utils/generateToken.utils.js"

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
	const userId = req.userData?.userId;
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

export const newRefreshTokens = async (req, res) => {

	const incomingRefreshToken = req.cookies.iAmRefreshToken || req.body.refreshToken

	if (!incomingRefreshToken) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized request!!!',
		});
	}

	try {
		const decodedRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

		const userData = await User.findById(decodedRefreshToken?.userId).select('-password -whatRole')

		console.log(userData);

		if (!userData) {
			return res.status(401).json({
				success: false,
				message: 'Invalid refresh token'
			})
		}

		if (incomingRefreshToken !== userData?.refreshToken) {
			return res.status(401).json({
				success: false,
				message: 'Refresh token is expired or used'
			})
		}

		const options = {
			httpOnly: true,
			secure: true,
			sameSite: "Strict"
		}

		const newAccessToken = generateAccessTokens({ email: userData.email, userId: userData._id }, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRY)
		const newRefreshToken = generateRefreshTokens({ userId: userData._id }, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRY)

		userData.refreshToken = newRefreshToken
		await userData.save({ validateBeforeSave: false })

		return res
			.status(200)
			.cookie("iAmAccessToken", newAccessToken, options)
			.json({
				success: true,
				message: 'Access token refreshed',
				accessToken: newAccessToken
			})
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: `Invalid refresh token ${error.message}`
		})
	}
}
