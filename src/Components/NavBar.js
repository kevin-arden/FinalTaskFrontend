import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { API } from "../Config/api";
import { Link } from "react-router-dom";

import "../navbar.css";

//context
import { AppContext } from "../Context/globalContext";
import { CartContext } from "../Context/cartContext";

import LoginComponent from "../Components/LoginComp";
import SignUp from "../Components/SignUpComp";

import icon from "../Icon/Icon.png";
import cartLogo from "../Icon/cartLogo.svg";
import logout from "../Icon/logout.svg";
import profilePic from "../Icon/ProfilePic.png";
import profileIcon from "../Icon/profileIcon.svg";

const NavBar = () => {
  const cart = useContext(CartContext);
  const app = useContext(AppContext);

  const cartState = cart[0];
  const cartDispatch = cart[1];

  const appState = app[0];
  const appDispatch = app[1];

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const showingModalLogin = () => setShowLogin(true);

  const closingModalLogin = () => setShowLogin(false);

  const showingModalRegister = () => setShowRegister(true);

  const closingModalRegister = () => setShowRegister(false);

  const goProfile = () => {
    history.push(`/profile`);
  };
  const goHome = () => {
    history.push(`/`);
  };
  return (
    <div className="navbarContainer">
      <Navbar bg="none" expand="lg">
        <Navbar.Brand onClick={goHome} className="navbarLogo">
          <img src={icon} alt="" />
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {appState.isLogin ? (
            <Nav>
              <Nav.Link
                to="/cart"
                as={Link}
                className="font-weight-bold text-black"
                style={{
                  marginRight: "36px",
                  marginTop: "50px",
                  overflow: "hidden",
                }}
              >
                <div className="cartLogo">
                  <img src={cartLogo} alt="" />
                </div>

                {cartState.carts.length > 0 ? (
                  <div className="cartNumber">{cartState.carts.length}</div>
                ) : (
                  <div></div>
                )}
              </Nav.Link>
              <div class="dropdown">
                <img className="foto" src={profilePic} alt="" />
                <div class="dropdown-content">
                  <a onClick={goProfile}>
                    <img src={profileIcon} alt="" />
                    Profile
                  </a>
                  <a
                    onClick={() => [
                      appDispatch({ type: "LOGOUT" }),
                      cartDispatch({ type: "CLEAR_CART" }),
                    ]}
                  >
                    <img src={logout} alt="" />
                    Logout
                  </a>
                </div>
              </div>
            </Nav>
          ) : (
            <Nav>
              <button
                className="navbarButton"
                onClick={showingModalLogin}
                style={{
                  backgroundColor: "none",
                }}
              >
                Login
              </button>
              <button
                className="navbarButton"
                onClick={showingModalRegister}
                style={{
                  backgroundColor: "#393939",
                  color: "white",
                }}
              >
                Register
              </button>
              <Modal
                show={showLogin}
                onHide={closingModalLogin}
                dialogClassName="modal-main"
              >
                <Modal.Body>
                  <LoginComponent
                    textButton="Login"
                    showingModalRegister={showingModalRegister}
                    closingModalLogin={closingModalLogin}
                  />
                </Modal.Body>
              </Modal>
              <Modal
                show={showRegister}
                onHide={closingModalRegister}
                dialogClassName="modal-main"
              >
                <Modal.Body>
                  <SignUp
                    textButton="Register"
                    showingModalLogin={showingModalLogin}
                    closingModalRegister={closingModalRegister}
                  />
                </Modal.Body>
              </Modal>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
