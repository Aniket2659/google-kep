import React, { useState } from "react";
import "../Style/Register.css";
import { registerApiCall } from "../Services/Api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showFirstNameError, setShowFirstNameError] = useState(false);
  const [showLastNameError, setShowLastNameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false); 
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] =useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    let valid = true;

    setShowFirstNameError(false);
    setShowLastNameError(false);
    setShowEmailError(false);
    setShowUsernameError(false); // Reset username error
    setShowPasswordError(false);
    setShowConfirmPasswordError(false);

    // Validation
    if (!firstName.length) {
      setShowFirstNameError(true);
      valid = false;
    }
    if (!lastName.length) {
      setShowLastNameError(true);
      valid = false;
    }
    if (!email.length || !emailRegex.test(email)) {
      setShowEmailError(true);
      valid = false;
    }
    if (!username.length) {
      setShowUsernameError(true); // Validate username
      valid = false;
    }
    if (!password.length || !passwordRegex.test(password)) {
      setShowPasswordError(true);
      valid = false;
    }
    if (password !== confirmPassword) {
      setShowConfirmPasswordError(true);
      valid = false;
    }

    if (valid) {
      registerApiCall({
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
      })
       .then(() => {
         navigate('/login');
       })
       .catch((error) => {
         console.error('registration failed', error);
       });
    }
  };

  return (
    <div className="register-container">
      <div className="form-section">
        <div className="header-section">
          <div className="logo-section">
            <span className="logo-letter" style={{ color: "rgb(4, 4, 125)" }}>
              G
            </span>
            <span className="logo-letter" style={{ color: "rgb(208, 3, 3)" }}>
              o
            </span>
            <span className="logo-letter" style={{ color: "rgb(222, 218, 4)" }}>
              o
            </span>
            <span className="logo-letter" style={{ color: "rgb(4, 4, 125)" }}>
              g
            </span>
            <span
              className="logo-letter"
              style={{ color: "rgba(17, 206, 4, 0.749)" }}
            >
              l
            </span>
            <span className="logo-letter" style={{ color: "rgb(208, 3, 3)" }}>
              e
            </span>
          </div>
          <div className="account-info">
            <span style={{ fontSize: "25px" }}>Create your Google Account</span>
          </div>
        </div>
        <div className="input-section">
          <div className="name-input-section">
            <input
              className="input-field"
              type="text"
              placeholder="First Name*"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {showFirstNameError && (
              <span className="error-message">First Name is required.</span>
            )}
            <input
              className="input-field"
              type="text"
              placeholder="Last Name*"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {showLastNameError && (
              <span className="error-message">Last Name is required.</span>
            )}
          </div>
          <div className="username-input-section">
            <input
              className="input-field"
              type="text"
              placeholder="Username*"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {showUsernameError && (
              <span className="error-message">Username is required.</span>
            )}
          </div>

          <div className="email-input-section">
            <input
              className="input-field"
              type="text"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {showEmailError && (
              <span className="error-message">
                Please enter a valid email address.
              </span>
            )}
            <div className="email-info">
              <span className="info-text">
                You can use letters, numbers & periods
              </span>
              <a href="#" className="alternate-email-link">
                Use my current email address instead
              </a>
            </div>
          </div>
        </div>
        <div className="password-section">
          <div className="password-input-section">
            <input
              className="input-field"
              type="password"
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPasswordError && (
              <span className="error-message">Password is required.</span>
            )}
            <input
              className="input-field"
              type="password"
              placeholder="Confirm Password*"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showConfirmPasswordError && (
              <span className="error-message">Passwords must match.</span>
            )}
          </div>
          <div className="password-info">
            <span>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </span>
            <div className="show-password-section">
              <input type="checkbox" id="show-password" />
              <label htmlFor="show-password" style={{ marginLeft: "10px" }}>
                Show Password
              </label>
            </div>
          </div>
        </div>
        <div className="action-section">
          <div className="signin-link-section">
            <a href="#" style={{ textDecoration: "none" }}>
              Sign in instead
            </a>
          </div>
          <div className="next-button-section">
            <button className="next-button" onClick={handleRegisterClick}>
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="image-section">
        <img src="/GoogleRegIMG.jpg" alt="Google Registration" />
      </div>
    </div>
  );
}

export default Register;
