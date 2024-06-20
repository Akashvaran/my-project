import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
   viewed: {
    type: Boolean,
    default: false
  }
});

const ContactDetails = mongoose.model('ContactDetails', ContactSchema);

export default ContactDetails;