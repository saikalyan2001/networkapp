import React, { useState } from "react";
import "./SignUp.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import GoogleAuth from "../AuthPage/GoogleAuth.jsx";

function SignUp() {
  const [showpassword, setShowpassword] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);

  const handePasswordChange = (value) => {
    setPasswordChange(value.trim() !== "");
  };

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    fullname: "",
    username: "",
  });

  // const navigate = useNavigate();

  // const handleAuth = () => {
  //   console.log(inputs);
  //   if(!inputs.email || !inputs.password || !inputs.username) {
  //     alert("Please fill all the fields");
  //     return;
  //   }

  //   navigate("/auth");
  // };

  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth");
  };

  return (
    <div className="auth-container">
      <div action="" className="login-form">
        <div className="login-container">
          <div className="login-logo">Samskrithi</div>

          <div className="form-bottom-content">
            {/* <div className="login-fb">Log in with Facebook</div> */}
            <GoogleAuth />
            <div className="or-container">
              <div className="vertical-line"></div>
              <p className="or">OR</p>
              <div className="vertical-line"></div>
            </div>
          </div>

          <div className="login-input-container">
            <input
              className="login-input"
              type="text"
              placeholder="Mobile Number or Email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <div className="password-container">
              <input
                className="login-input"
                type={showpassword ? "text" : "password"}
                placeholder="Password"
                value={inputs.password}
                onChange={(e) => {
                  setInputs({ ...inputs, password: e.target.value });
                  handePasswordChange(e.target.value);
                }}
              />
              <p
                className="pass-show"
                onClick={() => setShowpassword(!showpassword)}
              >
                {inputs.password && showpassword
                  ? "Hide"
                  : inputs.password
                  ? "Show"
                  : ""}
              </p>
            </div>
            <input
              className="login-input"
              type="text"
              placeholder="Full Name"
              value={inputs.fullname}
              onChange={(e) =>
                setInputs({ ...inputs, fullname: e.target.value })
              }
            />
            <input
              className="login-input"
              type="text"
              placeholder="Username"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />

            {/* {error && (
              console.log(error.message)
            )} */}

            {error && (
              <>
                {console.log("hey-error:", error)}
                alert("this" {error.message})
              </>
            )}

            <button className="login-btn" onClick={() => signup(inputs)}>
              Sign up
            </button>
          </div>
        </div>

        <div className="bottom-container">
          Have an account?
          <p onClick={handleLogin}>
            <span className="sign-up">Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
