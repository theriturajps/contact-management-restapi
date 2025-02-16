import jwt from "jsonwebtoken";

export const checkAuthToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.sendStatus(401); // Fix: Corrected syntax

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
		if (err) {
			return res.status(403).json({
				success: false,
				message: 'Forbidden!!! You are unauthorized',
			});
		}

		req.userData = data;
		next();
	});
};
