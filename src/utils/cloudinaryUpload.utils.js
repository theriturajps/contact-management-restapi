import { v2 as cloudinary } from 'cloudinary'

export const cloudinaryUpload = async (uploadFileName, uploadImagePath) => {

	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET
	});

	const cloudinaryUploadResult = await cloudinary.uploader
		.upload(uploadImagePath, { public_id: uploadFileName, })
		.catch((error) => {
			console.log(error);
		})

	return cloudinaryUploadResult
}

