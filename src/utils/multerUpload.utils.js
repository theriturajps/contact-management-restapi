import multer from "multer"

const imageUploadStorage = multer.diskStorage({
	destination: '/public/',
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now())
	}
})

export const multerImage = multer({ storage: imageUploadStorage })