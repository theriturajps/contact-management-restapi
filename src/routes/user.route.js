import { Router } from "express";
import { createRateLimiter } from "../middleware/rateLimit.middleware.js"
import { multerImage } from "../utils/multerUpload.utils.js";
import { loginController } from "../controllers/login.controller.js";
import { signupController } from "../controllers/signup.controller.js";
import { checkAuthToken } from "../middleware/auth.middleware.js";
import { deleteUserController } from "../controllers/user.controller.js";
import { newRefreshTokens } from "../controllers/user.controller.js";

const userRouter = Router()

const rateLimiter = createRateLimiter({
	windowMs: 60 * 1000,    // 1 minute
	maxRequests: 1,       // limit each IP to 100 requests per window
	message: 'You have exceeded the request limit. Please wait and try again after 1 minute'
});


userRouter.post('/login', rateLimiter, multerImage.none(), loginController)
userRouter.post('/signup', rateLimiter, multerImage.single('profileImage'), signupController)
userRouter.post('/newtoken', rateLimiter, checkAuthToken, newRefreshTokens) // renew refresh token

userRouter.delete('/delete', checkAuthToken, deleteUserController)

export default userRouter