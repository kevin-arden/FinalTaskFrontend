import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Image } from "cloudinary-react";

//css
import "../card.css";

//context
import { AppContext } from "../Context/globalContext";

const BookOwnedCard = ({ book }) => {
  const [state] = useContext(AppContext);

  const { id, thumbnail, title, author, bookAttachment } = book;

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
        style={{ marginBottom: "0px" }}
        key={id}
        onClick={() =>
          state.isLogin ? history.push("/book/" + book.id) : handleShow
        }
      >
        <div>
          <Image
            style={{ height: 270, width: 200 }}
            cloudName="kev-cloud"
            publicId={book.image_id}
          />
        </div>
        <div>
          <p className="title-card">{title}</p>
          <p className="writer">{author}</p>
        </div>
      </div>
      <div>
        {/* <a href={`http://localhost:5000/pdf/${bookAttachment}`}> */}
        <a
          href={bookAttachment} target="_blank"
        >
          <button
            // onClick={(e) => downloadBook(e)}
            className="btn btn-primary btn-block"
            style={{
              marginBottom: "20px",
              width: "200px",
              backgroundColor: "#393939",
              borderColor: "#393939",
            }}
          >
            Download Book
          </button>
        </a>
      </div>
    </div>
  );
};

export default BookOwnedCard;
