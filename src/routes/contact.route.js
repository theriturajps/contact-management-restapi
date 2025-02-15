import { contactController } from "../controllers/contact.controller.js";
import { Router } from "express";

const contactRouter = Router()

contactRouter.get('/all', contactController) // get all contacts
contactRouter.get('/:id', contactController) // contacts by id

contactRouter.post('/new', contactController) // create new contact

contactRouter.delete('/:id', contactController) // delete the contact

contactRouter.patch('/:id', contactController) // update the contact

export default contactRouter