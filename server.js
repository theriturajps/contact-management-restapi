import 'dotenv/config'
import { app } from "./src/app.js"
import { dbConnect } from './src/db/connectionDb.js'


const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
	
try {
		dbConnect(MONGODB_URI)
		app.listen(PORT, () => {
			console.log(`Server started on http://localhost:${PORT}`);
		})
	} catch (error) {
		throw new Error("Server error occurred", { cause: error })
	}