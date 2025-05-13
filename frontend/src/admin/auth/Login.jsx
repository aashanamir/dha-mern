import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogInUser } from "../../Slice/userSlice";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { userStatus } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(LogInUser( email, password )); // Ensure LogInUser receives an object
  };

  return (
    <div className={`${styles.loginContainer} d-flex justify-content-center align-items-center vh-100`}>
      <div className={`card ${styles.loginCard}`}>
        <div className="card-body">
          <h2 className={`card-title text-center ${styles.loginTitle}`}>Start Your Session</h2>
          
          {/* Login Status */}
          {userStatus === "loading" && <p className="text-center text-warning">Logging in...</p>}
          {userStatus === "failed" && <p className="text-center text-danger">Login Failed</p>}
          
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <button type="submit" className={`btn w-100 ${styles.loginButton}`}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
