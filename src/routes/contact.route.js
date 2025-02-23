import { checkAuthToken } from "../middleware/auth.middleware.js"
import { multerImage } from "../utils/multerUpload.utils.js"
import { getAllContact, createNewContent, deleteContact, updatedContact } from "../controllers/contact.controller.js"
import { Router } from "express"

const contactRouter = Router()

// api/v1/contact

contactRouter.get('/all', checkAuthToken, getAllContact) // contacts by id

contactRouter.post('/new', checkAuthToken, multerImage.none(), createNewContent) // create new contact for the user id

contactRouter.delete('/:id/delete', checkAuthToken, deleteContact) // delete the contact

contactRouter.patch('/:id', updatedContact) // update the contact


export default contactRouter