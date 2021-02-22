/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../Config/api";
//css
import "../App.css";

import SignUp from "../Components/SignUpComp";

//context
import { AppContext } from "../Context/globalContext";

const loginComponent = ({ showingModalRegister, closingModalLogin }) => {
  let history = useHistory();

  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useContext(AppContext);

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginFormData;

  const onChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({
        email,
        password,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoading(true);

      const user = await API.post("/login", body, config);

      const transactions = await API.get("/transactions");

      console.log(transactions);

      setLoading(false);

      // if (isSubbed.length > 0) {
      //   dispatch({
      //     type: "SUBBED",
      //   });
      // }

      console.log(user.data.data.user)
      const role = user.data.data.user.role;

      console.log(user.data);
      if (role === "ADMIN") {
        dispatch({
          type: "LOGIN_ADMIN",
          payload: user.data.data.user,
        });
        setAuthToken(user.data.data.user.token);
        history.push("/transaction");
      } else if (role === "USER") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user.data.data.user,
        });
        setAuthToken(user.data.data.user.token);
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* <button
        onClick={showingModalLogin}
        className="btn"
        style={{
          width: "190px",
          height: "50px",
          backgroundColor: "none",
          borderColor: "#393939",
          marginRight: "10px",
        }}
      >
        {textButton}
      </button> */}

      {/* <Modal
        show={show}
        onHide={closingModalLogin}
        dialogClassName="modal-main"
      >
        <Modal.Body> */}
      <div className="sign-body">
        <p className="sign-header">Sign In</p>

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
            <button
              className="btn"
              onClick={() => closingModalLogin()}
              style={{
                display: "block",
                width: "100%",
                marginTop: "36px",
                marginBottom: "21px",
                color: "white",
                backgroundColor: "#393939",
              }}
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="sign-bottom">
          Don't Have an account ?{" "}
          <a onClick={() => [closingModalLogin(), showingModalRegister()]}>
            <b>Click here</b>
          </a>
          {/* <SignUp setShowSignUp={true} textButton="Click here" />{" "} */}
        </p>
      </div>
      {/* </Modal.Body>
      </Modal> */}
      {/* <div>
        <pre>
          {JSON.stringify(loginFormData, null, 2)}
        </pre>
      </div> */}
    </div>
  );
};

export default loginComponent;
