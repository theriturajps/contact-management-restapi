import express, { urlencoded } from "express"
import userRouter from "./routes/user.route.js"
import contactRouter from "./routes/contact.route.js"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', userRouter)
app.use('/api/v1/contact', contactRouter)

export { app }