import { useState } from 'react';
import axios from 'axios';

export const Forget = () => {
  const [Email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    axios.post('http://localhost:8000/auth/forget', { Email })
      .then(res => {
        if (res.data.status) {
          alert("Check your email for reset password link");
        } else {
          alert(res.data.msg);
        }
      })
      .catch(err => {
        console.error(err);
        alert("An error occurred. Please try again later.");
      });
  }

  return (
    <>
      <h1 className="text-center">Forgot Password</h1>
      <div className="d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              style={{ width: "300px" }}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

  
