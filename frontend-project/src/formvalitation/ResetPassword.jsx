import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

function ResetPassword() {
    const [Password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams(); 

    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`http://localhost:8000/auth/reset/${token}`, { Password })
            .then(res => {
                if (res.data.status) {
                    setMessage("Password reset successful. You can now log in with your new password.");
                } else {
                    setMessage(res.data.msg);
                }
            })
            .catch(err => {
                console.error(err);
                setMessage("An error occurred. Please try again later.");
            });
    }

    return (
        <>
            <h1 className="text-center">Reset Password</h1>
            <div className="d-flex justify-content-center align-items-center">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            New Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            style={{ width: "300px" }}
                            className="form-control"
                            id="exampleInputPassword1"
                            aria-describedby="passwordHelp"
                        />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">
                        Reset
                    </button>
                </form>
            </div>
            {message && <div className="alert alert-info text-center mt-3">{message}</div>}
        </>
    );
}

export { ResetPassword };
