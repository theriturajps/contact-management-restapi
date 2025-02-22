import jwt from "jsonwebtoken"
import { generateAccessTokens, generateRefreshTokens } from "../utils/generateToken.utils.js"
import { User } from "../models/user.model.js"

export const deleteUserController = async (req, res) => {
	const userId = req.userData.userId

	const userData = await User.findById(userId)

	if (!userData) return res.status(404).json({ message: `User with ID ${userId} does not exists.` });

	await userData.deleteOne({ _id: userId })

	res.json({ message: `User with ID ${userId} deleted successfully.` });
}

export const newRefreshTokens = async (req, res) => {

	const incomingRefreshToken = req.cookies.iAmRefreshToken || req.body.iAmRefreshToken

	if (!incomingRefreshToken) {
		return res.status(401).json({
			success: false,
			message: 'Please Login to perform action. Unauthorized request!!!',
		});
	}

	try {
		const decodedRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

		const userData = await User.findById(decodedRefreshToken?.userId).select('-password -whatRole')

		if (!userData) {
			return res.status(401).json({
				success: false,
				message: 'Invalid refresh token'
			})
		}

		if (incomingRefreshToken !== userData?.refreshToken) {
			return res.status(401).json({
				success: false,
				message: 'Refresh token is expired or used, Please get new from database and use it!!!'
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
				message: 'Access token and Refresh token is refreshed!!!',
				accessToken: newAccessToken
			})
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: `Invalid refresh token ${error.message}`
		})
	}
}
