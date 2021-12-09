import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
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
import addBook from "../Icon/addBook.svg";

const NavBar = () => {
  const cart = useContext(CartContext);
  const app = useContext(AppContext);

  const cartState = cart[0];
  const cartDispatch = cart[1];

  const appState = app[0];
  const appDispatch = app[1];

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const history = useHistory();
  const showingModalLogin = () => setShowLogin(true);
  const [state, dispatch] = useContext(AppContext);
  const [inTransaction, setInTransaction] = useState(true)

  const closingModalLogin = () => setShowLogin(false);

  const showingModalRegister = () => setShowRegister(true);

  const closingModalRegister = () => setShowRegister(false);

  const goProfile = () => {
    history.push(`/profile`);
  };
  const goHome = () => {
    history.push(`/`);
  };

  const goAddBook = () => {
    history.push(`/addbook`);
  };

  const goTransaction = () => {
    history.push(`/transaction`);
  };

  return (
    <div className="NavBar">
      <div className="leftSide">
        <Navbar.Brand
          onClick={appState.isAdmin ? goTransaction : goHome}
          className="navbarLogo"
        >
          <img src={icon} alt="" />
        </Navbar.Brand>
      </div>
      <div className="rightSide">
        {appState.isLogin ? (
          <Nav>
            {appState.isAdmin ? (
              ""
            ) : (
              <Nav.Link
                to="/cart"
                as={Link}
                className="font-weight-bold whole-cart"
              >
                <div>
                  <img className="cart-logo" src={cartLogo} alt="" />
                </div>

                {cartState.carts.length > 0 ? (
                  <div className="cartNumber">{cartState.carts.length}</div>
                ) : (
                  <div></div>
                )}
              </Nav.Link>
            )}
            <div class="dropdown">
              <img className="foto-profile" src={profilePic} alt="" />
              <div class="dropdown-content">
                {appState.isAdmin ? (
                  <div>
                    <a onClick={goAddBook}>
                      <img src={addBook} alt="" /> Add Book
                    </a>
                    <a onClick={() => dispatch({ type: "LOGOUT" })}>
                      <img src={logout} alt="" /> Logout
                    </a>
                  </div>
                ) : (
                  <div>
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
                )}
              </div>
            </div>
          </Nav>
        ) : (
          <Nav className="link-button">
            <button className="navbarButton login" onClick={showingModalLogin}>
              Login
            </button>
            <button
              className="navbarButton register"
              onClick={showingModalRegister}
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
      </div>
      {/* <Navbar bg="none" expand="lg">
        

        
      </Navbar> */}
    </div>
  );
};

export default NavBar;
