import { useState } from 'react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/contact', formData); // Ensure correct backend URL/port
      toast.success(res.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      toast.error('Error sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container ">
        <div className="row">
          <div className="col-md-6">
            <form className="contactform" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input type="email" className="form-control" id="email" value={email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Share your thoughts</label>
                <textarea className="form-control" id="message" rows="4" value={message} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  'SHARE YOUR FEEDBACK'
                )}
              </button>
            </form>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="contact-info">
              <h2>Contact <span>Us</span></h2>
              <p>It is very important for us to keep in touch with you, so we are always ready to answer any question that interests you. Shoot!</p>
              <ul className="contact-icons">
                <li><FaGithub /></li>
                <li><FaLinkedin /></li>
                <li><FaFacebook /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export { Contact };
