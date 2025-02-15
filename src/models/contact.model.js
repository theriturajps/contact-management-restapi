import mongoose from "mongoose"

const contactModel = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	phoneNumber: {
		type: Number,
		required: true,
		trim: true
	},
	pincode: {
		type: Number,
		default: '000000',
		trim: true
	},
	gender: {
		type: String,
		required: true,
		enum: ['Male', 'Female', 'Others']
	},
	profileimg: {
		type: String,
		trim: true,
		default: "https://res.cloudinary.com/dgsigmemf/image/upload/v1739280154/user-image/default.png"
	}
}, {
	timestamps: true
})

const Contact = mongoose.model('Contact', contactModel)

export { Contact }