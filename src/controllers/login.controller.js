import bcrypt from "bcrypt"
import { User } from "../models/user.model.js"
import { sendMail } from "../utils/nodeMailer.utils.js"
import { generateAccessTokens, generateRefreshTokens } from "../utils/generateToken.utils.js"

export const loginController = async (req, res) => {

	const { email, password } = req.body

	if (!email || !password) {
		return res.status(401).json({
			success: false,
			message: 'Missing required fields: email and password are required'
		});
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

		const accessWalaToken = generateAccessTokens({ email: userData.email, userId: userData._id }, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRY)
		const refreshWalaToken = generateRefreshTokens({ userId: userData._id }, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRY)

		userData.refreshToken = refreshWalaToken
		await userData.save({ validateBeforeSave: false })

		sendMail(
			userEmail,
			'New Login Detected | Contact Management',
			`<div style="max-width:600px; margin:20px auto; font-family:Arial, sans-serif; padding:20px;">
				<h2 style="color:#333;">Hi ${userName}!</h2>
				<p style="color:#666; line-height:1.5;">
					We detected a login to your account from:<br>
					• Device: ${deviceType}<br>
					• Location: ${location}<br>
					• Time: ${loginTime}
				</p>
				<a href="${process.env.APP_URL}/account/security" 
					style="display:block; width:200px; margin:20px auto; padding:12px; 
									text-align:center; background:#007bff; color:white; 
									text-decoration:none; border-radius:5px;">
					Review Activity
				</a>
				<p style="color:#666; font-size:14px;">
					Not you? Please <a href="${process.env.APP_URL}/reset-password" style="color:#007bff;">reset your password</a> immediately.
				</p>
				<p style="color:#999; font-size:12px; text-align:center; border-top:1px solid #eee; padding-top:15px; margin-top:25px;">
					<a href="${process.env.APP_URL}/unsubscribe" style="color:#999;">Unsubscribe</a> | 
					<a href="${process.env.APP_URL}/privacy" style="color:#999;">Privacy</a>
				</p>
			</div>`
		);

		const cookieOptions = {
			httpOnly: true,
			secure: true,
			sameSite: "Strict"
		}

		return res.status(200)
			.cookie("iAmAccessToken", accessWalaToken, cookieOptions)
			.json({
				success: true,
				message: `Hello ${userData.fullName}, Authentication successful!!!`,
				user: {
					id: userData._id,
					name: userData.fullName,
					email: userData.email
				}
			})
	}

}