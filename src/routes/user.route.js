import { Router } from "express";
import { rateLimit } from "../middleware/rateLimit.middleware.js"
import { multerImage } from "../utils/multerUpload.utils.js";
import { loginController } from "../controllers/login.controller.js";
import { signupController } from "../controllers/signup.controller.js";
import { checkAuthToken } from "../middleware/auth.middleware.js";
import { deleteUserController } from "../controllers/user.controller.js";
import { newRefreshTokens } from "../controllers/user.controller.js";

const userRouter = Router()

const rateLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	maxRequests: 4, // 4 requests per minute
	handler: (req, res) => res.status(429).json({ message: 'You have exceeded the request limit. Please wait and try again after 1 minute' }),
	keyGenerator: (req) => req.ip, // Generate rate limit key based on IP address
	onLimitReached: (key) => console.log(`Rate limit reached for IP: ${key}`),
})


userRouter.post('/login', rateLimiter, multerImage.none(), loginController)
userRouter.post('/signup', rateLimiter, multerImage.single('profileImage'), signupController)
userRouter.post('/newtoken', checkAuthToken, newRefreshTokens) // renew refresh token

userRouter.delete('/delete', checkAuthToken, deleteUserController)

export default userRouter