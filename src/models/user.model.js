import mongoose, { mongo } from "mongoose"

const userModel = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	phoneNumber: {
		type: Number,
		required: true,
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
	},
	whatRole: {
		type: String,
		default: 'normalUser',
		enum: ['normalUser', 'masterAdmin']
	},
	contacts: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "Contact"
		}
	],
	refreshToken: {
		type: String
	}
}, {
	timestamps: true
})

const User = mongoose.model('User', userModel)

export { User }