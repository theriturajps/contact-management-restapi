import bcrypt from "bcrypt"
import { User } from "../models/user.model.js"
import { sendMail } from "../utils/nodeMailer.utils.js"
import { generateAccessTokens, generateRefreshTokens } from "../utils/generateToken.utils.js"

export const loginController = async (req, res) => {

	const { email, password } = req.body
	const userAgent = req.headers["user-agent"];

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
			userData.email,
			'New Login Detected | Contact Management',
			`<div style="max-width:400px; margin:10px auto; font-family:Arial, sans-serif; padding:15px; border:1px solid #eee; border-radius:5px; box-shadow:0 1px 5px rgba(0,0,0,0.05);">
				<h3 style="color:#333; margin-top:0; margin-bottom:10px;">New Login Detected</h3>
				<p style="color:#555; margin:5px 0;">Hi ${userData.fullName},</p>
				<p style="color:#555; margin:5px 0;">We detected a login from:</p>
				<div style="background:#f8f9fa; padding:10px; border-radius:4px; margin:10px 0;">
						<p style="color:#555; margin:0; font-size:13px;">
								<strong>Device:</strong> ${userAgent}<br>
								<strong>Time:</strong> ${new Date().toGMTString()}
						</p>
				</div>
				<p style="color:#555; margin:5px 0; font-size:13px;">If this was you, no action needed. Otherwise, secure your account now.</p>
				<div style="text-align:center; margin:15px 0;">
						<a href="/account/security" style="display:inline-block; padding:8px 16px; background:#0066cc; color:white; text-decoration:none; border-radius:3px; font-size:13px;">Review Activity</a>
				</div>
				<div style="background:#fff8f8; border-left:3px solid #ff3b30; padding:8px; margin:10px 0;">
						<p style="color:#d32f2f; margin:0; font-size:12px;">
								<strong>Not you?</strong> <a href="/reset-password" style="color:#d32f2f;">Reset password</a> and <a href="/support" style="color:#d32f2f;">contact support</a>.
						</p>
				</div>
				<div style="color:#999; font-size:11px; text-align:center; border-top:1px solid #eee; padding-top:8px; margin-top:15px;">
						<p style="margin:5px 0;">Automated security notification. Do not reply.</p>
						<p style="margin:5px 0;">
								<a href="/account/preferences" style="color:#777; margin:0 5px;">Preferences</a>
								<a href="/privacy" style="color:#777; margin:0 5px;">Privacy</a>
								<a href="/help" style="color:#777; margin:0 5px;">Help</a>
						</p>
						<p style="margin:5px 0;">© 2025 Contact Management. All rights reserved.</p>
				</div>
		</div>`
		)

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