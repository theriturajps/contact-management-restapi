import mongoose from "mongoose"


const dbConnect = async (URI) => {
	try {
		await mongoose.connect(URI)
		console.log('Mongodb database connected successfully !!!')
	} catch (error) {
		throw new Error("Database error occurred", { cause: error })
	}
}

export { dbConnect }