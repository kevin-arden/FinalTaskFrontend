import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../Config/api";

import LoginComponent from "../Components/LoginComp";

//css
import "../App.css";

//context
import { AppContext } from "../Context/globalContext";

const SignUp = ({ showingModalLogin, closingModalRegister }) => {
  let history = useHistory();

  const [show, setShow] = useState(false);
  const showingModalSignUp = () => setShow(true);
  const closingModalSignUp = () => setShow(false);

  const [state, dispatch] = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const { email, password, fullName } = signUpFormData;

  const onChange = (e) => {
    setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({
        fullName,
        email,
        password,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      setLoading(true);
      const user = await API.post("/register", body, config);
      setLoading(false);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user.data.data.user,
      });
      setAuthToken(user.data.data.user.token);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <div>
      <div className="sign-body">
        <p className="sign-header">Sign Up</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              type="email"
              class="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              type="password"
              class="form-control"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <input
              name="fullName"
              value={fullName}
              onChange={(e) => onChange(e)}
              type="text"
              class="form-control"
              placeholder="Full Name"
            />
          </div>
          <div className="form-group">
            <button
              className="btn "
              onClick={() => closingModalRegister()}
              style={{
                display: "block",
                width: "100%",
                marginTop: "36px",
                marginBottom: "21px",
                color: "white",
                backgroundColor: "#393939",
              }}
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="sign-bottom">
          Already Have an account ?{" "}
          <a onClick={() => [closingModalRegister(), showingModalLogin()]}>
            <b>Click here</b>
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
