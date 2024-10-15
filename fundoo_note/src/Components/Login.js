import React, { Component, useState } from "react";
import "../Style/Login.css";
import { loginApiCall } from "../Services/Api";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailError, setShowEmailError]= useState(false)
  const [showPasswordError, setShowPasswordError] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

  const navigate = useNavigate();

  const handleLoginClick=()=>{
    let valid = true;

    setShowEmailError(false);
    setShowPasswordError(false);

  if (!email.length || !emailRegex.test(email)) {
      setShowEmailError(true);
      valid = false;
    }

  if (!password.length || !passwordRegex.test(password)) {
      setShowPasswordError(true);
      valid = false;
    }
    if (valid) {
      loginApiCall({ email, password })
      .then((response) => {
        const token = response.data.data.access;
        const userName=response.data.data.data.username
        const email=response.data.data.data.email

        if (token) {
          localStorage.setItem('accessToken', token);
          localStorage.setItem('userName', userName);
          localStorage.setItem('email', email);
          navigate('/notes');
        } else {
          console.error('Access token not found in response');
        }
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
    
    }
  };
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <div className="google-logo">
              <span className="google-letter" style={{ color: "rgb(4, 4, 125)" }}>
                G
              </span>
              <span className="google-letter" style={{ color: "rgb(208, 3, 3)" }}>
                o
              </span>
              <span className="google-letter" style={{ color: "rgb(222, 218, 4)" }}>
                o
              </span>
              <span className="google-letter" style={{ color: "rgb(4, 4, 125)" }}>
                g
              </span>
              <span className="google-letter" style={{ color: "rgba(17, 206, 4, 0.749)" }}>
                l
              </span>
              <span className="google-letter" style={{ color: "rgb(208, 3, 3)" }}>
                e
              </span>
            </div>
            <div className="login-title">
              <span style={{ fontSize: "22px" }}>Login</span>
            </div>
            <div className="account-info">
              <span>Use your Google Account</span>
            </div>
          </div>
          <div className="email-input">
            <input
              className="input-field"
              type="text"
              placeholder="Email or Phone*"
              onChange={(e) => setEmail(e.target.value)}

            />
            {showEmailError && (<span className="login-error">Email is required and must be valid.</span>
            
          )}
          </div>
          <div className="password-input">
            <input
              className="input-field"
              type="password"
              placeholder="Password*"
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPasswordError && (<span className="login-error" >Password is required and must be at least 8 characters long, contain at least one uppercase letter, and one number.</span>
            
          )}
          </div>
          <div className="forgot-password">
            <a className="forgot-link" href="">
              Forgot Password?
            </a>
          </div>
          <div className="action-buttons">
            <a href="" className="create-account-link">
              Create account
            </a>
            <button className="login-btn" onClick={handleLoginClick}>Login</button>
          </div>
        </div>
      </div>
    );
  }


export default Login;
