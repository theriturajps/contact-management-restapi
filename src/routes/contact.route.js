import { getContactById, createNewContent, deleteContact, updatedContact } from "../controllers/contact.controller.js";
import { Router } from "express";

const contactRouter = Router()

contactRouter.get('/:id', getContactById) // contacts by id

contactRouter.post('/:id/new', createNewContent) // create new contact

contactRouter.delete('/:id', deleteContact) // delete the contact

contactRouter.patch('/:id', updatedContact) // update the contact

export default contactRouter