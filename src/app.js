import express from "express"
import userRouter from "./routes/user.route.js"
import contactRouter from "./routes/contact.route.js"

const app = express()

app.use('/', userRouter)
app.use('/api/v1/contact', contactRouter)

export { app }