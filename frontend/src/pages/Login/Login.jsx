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
    dispatch(LogInUser( email, password )); 
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>Start Your Session</h2>

        {/* Login Status */}
        {userStatus === "loading" && <p className={styles.statusLoading}>Logging in...</p>}
        {userStatus === "failed" && <p className={styles.statusError}>Login Failed</p>}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {/* Email Input */}
          <div className={styles.inputGroup}>
            <input
              type="email"
              className={styles.inputField}
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className={styles.inputGroup}>
            <input
              type="password"
              className={styles.inputField}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
