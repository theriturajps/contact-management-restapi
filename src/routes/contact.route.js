import { checkAuth } from "../middleware/auth.middleware.js"
import { multerImage } from "../utils/multerUpload.utils.js"
import { getContactById, createNewContent, deleteContact, updatedContact } from "../controllers/contact.controller.js"
import { Router } from "express"

const contactRouter = Router()

contactRouter.get('/all', checkAuth, getContactById) // contacts by id

contactRouter.post('/:id/new', multerImage.none(), createNewContent) // create new contact

contactRouter.delete('/:id', deleteContact) // delete the contact

contactRouter.patch('/:id', updatedContact) // update the contact

export default contactRouter