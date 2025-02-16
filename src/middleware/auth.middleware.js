import jwt from "jsonwebtoken"

export const checkAuthToken = (req, res, next) => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (token === null) return resizeBy.sendStatus(401)

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
		if (err) return res.status(403).json({
			success: false,
			message: 'Forbidden!!! You are unauthorised'
		})
		req.userData = data
		next()
	})
}