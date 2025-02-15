import { Router } from "express";
import { multerImage } from "../utils/multerUpload.utils.js";
import { loginController } from "../controllers/login.controller.js";
import { signupController } from "../controllers/signup.controller.js";

const userRouter = Router()

userRouter.post('/login', multerImage.none(), loginController)
userRouter.post('/signup', multerImage.single('profileImage'), signupController)

export default userRouter