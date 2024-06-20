/* eslint-disable react/prop-types */
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import { Flip, toast, ToastContainer } from 'react-toastify';
import { IoMdEye, IoIosEyeOff } from 'react-icons/io';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = ({ setShowLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Mobile: '',
    Password: '',
    currentState: 'signup',
  });
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.Email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.Email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!formData.Password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (!/^(?:[a-zA-Z]+|\d+|[a-zA-Z\d]+)$/.test(formData.Password)) {
      validationErrors.password = 'Special character is not allowed';
    }

    if (formData.currentState === 'signup') {
      if (!formData.Name.trim()) {
        validationErrors.name = 'Name is required';
      } else if (!/^[A-Z][a-zA-ZÀ-ÿ' .]+$/.test(formData.Name)) {
        validationErrors.name = 'Invalid name format';
      }

      if (!formData.Mobile.trim()) {
        validationErrors.mobile = 'Mobile number is required';
      } else if (!/^\+?[0-9\-() ]+$/.test(formData.Mobile)) {
        validationErrors.mobile = 'Invalid mobile number';
      }
    }

    if (!isChecked) {
      validationErrors.terms = 'Please accept the Terms and Conditions';
    }

    return validationErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const url = formData.currentState === 'Login' ? 'http://localhost:8000/auth/login' : 'http://localhost:8000/auth/signup';

      try {
        const res = await axios.post(url, formData, { withCredentials: true });
       
        if (res.data.success) {
          if (formData.currentState === 'Login') {
            localStorage.setItem('token', res.data.token);
            const userdetails = res.data.username['_doc'];
            localStorage.setItem('username', JSON.stringify(userdetails));
          }
          toast.success(`${formData.currentState === 'signup' ? 'Signup' : 'Login'} Successful`, { position: 'bottom-center' });
          
          setFormData({
            Name: '',
            Email: '',
            Mobile: '',
            Password: '',
            currentState: formData.currentState,
          });
          setIsChecked(false);
          setErrors({});
        } else {
          toast.error(res.data.msg || 'Something went wrong', { position: 'bottom-right' });
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.msg || 'Server error occurred', { position: 'bottom-center' });
        } else {
          toast.error('Error occurred while processing the request', { position: 'bottom-center' });
        }
      }
    }
  };
  const forget =()=>{
    setShowLogin(false)
  }

  const resetForm = (newState) => {
    setFormData({
      Name: '',
      Email: '',
      Mobile: '',
      Password: '',
      currentState: newState,
    });
    setIsChecked(false);
    setErrors({});
  };

  return (
    <div className="login-page">
      <form className="login-Container" onSubmit={handleLogin}>
        <div className="login-message">
          <h2 className='StateName'>{formData.currentState === 'signup' ? 'Signup' : 'Login'}</h2>
          <h2 onClick={() => setShowLogin(false)}><IoMdClose /></h2>
        </div>
        <div className="login-msginputs">
          {formData.currentState === 'signup' && (
            <>
              <input
                type="text"
                name="Name"
                onChange={handleChange}
                value={formData.Name}
                placeholder="Enter Your Name"
              />
              {errors.name && <p className="error">{errors.name}</p>}
              <input
                type="text"
                name="Mobile"
                onChange={handleChange}
                value={formData.Mobile}
                placeholder="Enter Mobile Number"
              />
              {errors.mobile && <p className="error">{errors.mobile}</p>}
            </>
          )}
          <input
            type="email"
            name="Email"
            onChange={handleChange}
            value={formData.Email}
            placeholder="Enter Your Email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              name="Password"
              onChange={handleChange}
              value={formData.Password}
              placeholder="Enter Your Password"
              autoComplete="current-password"
            />
            <span className="password-toggle" onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
            </span>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="login-condition">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label>Agree to the terms and conditions</label>
        </div>
        {errors.terms && <p className="error">{errors.terms}</p>}
        <button className="Conformbutton" type="submit">
          {formData.currentState === 'signup' ? 'Create Account' : 'Login'}
        </button>

        {formData.currentState === 'Login' && (
          <div className="forgot-password" onClick={forget}>
            <Link to="/forgot">Forgot Password?</Link>
          </div>
        )}

        <div className="accounntverfiaction">
          {formData.currentState === 'Login' ? (
            <p>
              Create a new account? <span onClick={() => resetForm('signup')}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account? <span onClick={() => resetForm('Login')}>Login here</span>
            </p>
          )}
        </div>
      </form>
      <ToastContainer transition={Flip} />
    </div>
  );
};

export { Login };