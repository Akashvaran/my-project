// ContactController.js
import ContactDetails from "../model/ContactAuth.js";
import sendMail from "./Mailer.js";

export const createContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new ContactDetails({
      name,
      email,
      message
    });

    await newContact.save();


    const mailSubject = 'Thank you for contacting us';
    const mailText = `Hello ${name},\n\nThank you for reaching out to us. We have received your message:\n\n"${message}"\n\nWe will get back to you shortly.\n\nBest regards,\nYour Company`;

    await sendMail(email, mailSubject, mailText);

    res.status(201).json({ message: 'Contact message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
 const markAsViewed = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await ContactDetails.findByIdAndUpdate(id, { viewed: true }, { new: true });
    res.status(200).json(message);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getMails = async (req, res) => {
  try {
      const products = await ContactDetails.find();
      res.status(200).json(products);
  } catch (err) {
      res.status(500).send(err);
  }
};

export {getMails, markAsViewed}