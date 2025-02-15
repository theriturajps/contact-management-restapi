import { Router } from "express";
import { loginController } from "../controllers/login.controller.js";
import { signupController } from "../controllers/signup.controller.js";

const userRouter = Router()

userRouter.get('/login', loginController)
userRouter.post('/signup', signupController)

export default userRouter