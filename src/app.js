import express, { urlencoded } from "express"
import userRouter from "./routes/user.route.js"
import contactRouter from "./routes/contact.route.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "16kb" }))
app.use(cookieParser())

app.use('/', userRouter)
app.use('/api/v1/contact', contactRouter)

export { app }