import express from 'express';
import { createContact, getMails, markAsViewed } from '../controller/ContactControler.js';

const ContactRoute = express.Router();

ContactRoute.post('/contact', createContact);
ContactRoute.get('/message',getMails)
ContactRoute.put('/message/:id/viewed', markAsViewed);

export default ContactRoute;