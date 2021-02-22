import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../Context/cartContext";
import { AppContext } from "../../Context/globalContext";
import { Modal } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { API } from "../../Config/api";

//Component
import NavBar from "../../Components/NavBar";

import "../../spinner.css";
//css
import "./DetailBook.css";

import background from "../../Icon/background.png";

const DetailBook = () => {
  const cart = useContext(CartContext);
  const app = useContext(AppContext);

  const cartState = cart[0];
  const cartDispatch = cart[1];

  const appState = app[0];
  const appDispatch = app[1];

  const [show, setShow] = useState(false);
  const [user, setUser] = useState();
  const [book, setBook] = useState([]);
  const [owned, setOwned] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const handleClose = () => setShow(false);
  const getDetailBook = async () => {
    try {
      setLoading(true);

      const getBook = await API.get(`/book/${id}`);
      setBook(getBook.data.data.book);

      setLoading(false);

      if (appState.userLogin.bookOwned.includes(id)) {
        setOwned(true);
      } else {
        console.log("gagal");
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(appState.userLogin.bookOwned);
  // const bookCart = JSON.parse("[" + book1 + "]");

  const getUserData = async () => {
    try {
      setLoading(true);

      setLoading(false);
    } catch (err) {}
  };

  const getBookOwned = async () => {};

  useEffect(() => {
    getDetailBook();
    getUserData();
    getBookOwned();
    // if (user.bookOwned.includes(book.id)) {
    //   setOwned(true);
    // }
  }, []);

  console.log(user);
  console.log(owned);

  const addProductToCart = async () => {
    const product = book;
    setShow(true);

    await cartDispatch({
      type: "ADD_CART",
      payload: product,
    });
  };

  const downloadBook = async (e) => {
    e.preventDefault();

    const file = book.bookAttachment;
    window.open(file);
  };

  return loading ? (
    <div class="loader">Loading...</div>
  ) : (
    <div>
      <NavBar />
      <div
        className="App-header "
        style={{
          backgroundImage: `url(${background})`,
          borderColor: "#F3F3F3",
        }}
      >
        <div className="col-md-9 detail-book">
          <div className="row">
            <div className="col-md-5">
              <img
                src={`http://localhost:5000/image/${book.thumbnail}`}
                className="detail-image img-fluid"
                alt=""
              />
            </div>
            <div className="col-md-7">
              <p className="title">{book.title}</p>
              <p className="writer">By. {book.author}</p>

              <p className="upper">Publication Date</p>
              <p className="lower">{book.publicationDate}</p>
              <p className="upper">Pages</p>
              <p className="lower">{book.pages}</p>
              <p className="upper isbn-tag">ISBN</p>
              <p className="lower">{book.isbn}</p>
              <p className="upper ">Price</p>
              <p className="lower price-tag">Rp. {book.price}</p>
            </div>
          </div>
          <div className="bawah">
            <p className="title-about">About This Book</p>
            <p className="text-about">{book.description}</p>
          </div>
          <div className="row">
            <div className="col-md-9"></div>
            <div style={{ marginBottom: "20px" }} className="col-md-3">
              {owned ? (
                <button
                  onClick={(e) => downloadBook(e)}
                  className="btn btn-primary btn-block"
                  style={{
                    backgroundColor: "#393939",
                    borderColor: "#393939",
                  }}
                >
                  Download Book
                </button>
              ) : (
                <button
                  onClick={() => addProductToCart()}
                  className="btn btn-primary btn-block"
                  style={{
                    backgroundColor: "#393939",
                    borderColor: "#393939",
                  }}
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body style={{ color: "#29BD11" }}>
            The product is successfully added to the cart
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default DetailBook;
