import jwt from "jsonwebtoken"

export const generateAccessTokens = (userObject, AccessTokenSecret, AccessExpiresDuration) => {
	return jwt.sign(userObject, AccessTokenSecret, { expiresIn: AccessExpiresDuration })
}
export const generateRefreshTokens = async (userObject, RefreshTokenSecret, RefreshExpiresDuration) => {
	return jwt.sign(userObject, RefreshTokenSecret, { expiresIn: RefreshExpiresDuration })
}
