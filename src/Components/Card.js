import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Image } from "cloudinary-react";

//css
import "../card.css";

//context
import { AppContext } from "../Context/globalContext";

const Card = ({ book }) => {
  const [state] = useContext(AppContext);

  const { id, thumbnail, title, author, price, image_id } = book;

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const history = useHistory();
  return (
    <div>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body style={{ color: "red" }}>
          please make a payment to read the latest books
        </Modal.Body>
      </Modal>
      <div
        className="outer-box"
        key={id}
        onClick={() =>
          state.isLogin ? history.push("/book/" + book.id) : handleShow
        }
      >
        <div>
          <Image 
          style={{height:270,width:200}}
          cloudName="kev-cloud" publicId={image_id} />
        </div>
        <div>
          <p className="title-card-book">{title}</p>
          <p className="writer">{author}</p>
          <p className="price-tag">Rp {price}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
