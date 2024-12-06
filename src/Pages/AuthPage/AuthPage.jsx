import React, { useState } from "react";
import "./AuthPage.css";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

function AuthPage() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { loading, error, login } = useLogin();

  // const navigate = useNavigate();

  // const handleAuth = () => {
  //   console.log(inputs);
  //   if(!inputs.email || !inputs.password) {
  //     alert("Please fill all the fields");
  //     return;
  //   }

  //   navigate("/");
  // }

  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="auth-container">
      <div action="" className="login-form">
        <div className="login-container">
          <div className="login-logo">Samskrithi</div>
          <div className="login-input-container">
            <input
              className="login-input"
              type="text"
              placeholder="Phone number, username, or email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />

            {error && (
              <>
                {console.log("hey-error:", error)}
                alert({error.message})
              </>
            )}

            <button className="login-btn" onClick={() => login(inputs)}>
              Log in
            </button>

            <div className="or-container">
              <div className="vertical-line"></div>
              <p className="or">OR</p>
              <div className="vertical-line"></div>
            </div>

            <div className="form-bottom-content">
              <div className="login-fb">Log in with Facebook</div>
              <div className="forgot-pass">Forgot password?</div>
            </div>
          </div>
        </div>

        <div className="bottom-container">
          Don't have an account?
          <p onClick={handleSignup}>
            <span className="sign-up">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
