import { Router } from "express";
import { multerImage } from "../utils/multerUpload.utils.js";
import { loginController } from "../controllers/login.controller.js";
import { signupController } from "../controllers/signup.controller.js";
import { checkAuthToken } from "../middleware/auth.middleware.js";
import { deleteUserController } from "../controllers/user.controller.js";
import { newRefreshTokens } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.post('/login', multerImage.none(), loginController)
userRouter.post('/signup', multerImage.single('profileImage'), signupController)
userRouter.post('/newtoken', checkAuthToken, newRefreshTokens) // renew refresh token

userRouter.delete('/:id/delete', checkAuthToken, deleteUserController)

export default userRouter