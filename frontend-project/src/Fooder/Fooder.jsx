import 'bootstrap/dist/css/bootstrap.min.css';
import './Fooder.css';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaInstagramSquare, FaFacebookSquare } from 'react-icons/fa';
import { Location } from '../map/Location';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="containers">
        <div className="row">
          <div className="image-Comtainers col-md-5 position-relative">
            <div className="image-container">
            <Location/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group mb-3">
              <input type="email" className="form-control position-relative rounded-pill" placeholder="Your e-mail" />
              <button className="submit-botton position-absolute rounded-pill" type="button">Subscribe Now!</button>
            </div>
            <div className="row ">
              <div className="Heading-details col-md-4">
                <h5>Partnership</h5>
                <ul className="list-unstyled">
                  <li><a href="#">Websites</a></li>
                  <li><a href="#">Social Media</a></li>
                  <li><a href="#">Branding</a></li>
                </ul>
              </div>
              <div className="Heading-details col-md-4">
                <h5>About</h5>
                <ul className="list-unstyled">
                  <li><a href="#">Our Projects</a></li>
                  <li><a href="#">Careers</a></li>
                </ul>
              </div>
              <div className="Heading-details col-md-4">
                <h5>Support</h5>
                <ul className="list-unstyled">
                  <li><a href="#">Support Request</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="hr-line mt-4" />
        <div className="CopyLink">
          <div className="text-center mt-4">
            <p>All rights reserved @ akash2003</p>
          </div>
          <div className="social-icons">
            <Link to="#"><FaLinkedin /></Link>
            <Link to="#"><FaGithub /></Link>
            <Link to="#"><FaInstagramSquare /></Link>
            <Link to="#"><FaFacebookSquare /></Link>
          </div>
          <Link to={'/Message'}><button className='MessageButton'>View Message</button></Link>
            
        </div>
      </div>
    </footer>
  );
};

export { Footer };
