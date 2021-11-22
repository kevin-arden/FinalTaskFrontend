import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {Image} from 'cloudinary-react'
//css
import "../bestSeller.css";

//context
import { AppContext } from "../Context/globalContext";
import { CartContext } from "../Context/cartContext";

const BestSeller = ({ book }) => {
  const cart = useContext(CartContext);
  const app = useContext(AppContext);

  const cartState = cart[0];
  const cartDispatch = cart[1];

  const appState = app[0];
  const appDispatch = app[1];

  const { id, thumbnail, title, author, description, price, image_id } = book;

  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const addProductToCart = async () => {
    const product = book;
    setShow(true);

    await cartDispatch({
      type: "ADD_CART",
      payload: product,
    });
  };

  const history = useHistory();
  return (
    <div style={{ width: "750px", height: "550px", display: "inline-block" }}>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body style={{ color: "red" }}>
          please make a payment to read the latest books
        </Modal.Body>
      </Modal>

      <div
        className="best-box container-fluid"
        key={id}
        onClick={() => (appState.isLogin ? {} : handleShow)}
      >
        <div className="row">
          <div className="col-md-6">
            <Image
              style={{ height: 500, width: 350 }}
              cloudName="kev-cloud"
              publicId={image_id}
            />
          </div>
          <div className="col-md-6" style={{ wordWrap: "break-word" }}>
            <p className="title-card">{title}</p>

            <p className="writer">{author}</p>

            <p className="content">{description}</p>

            <p className="price">Rp {price}</p>

            <button
              onClick={() => addProductToCart()}
              className="btn btn-primary btn-block"
              style={{
                backgroundColor: "#393939",
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
