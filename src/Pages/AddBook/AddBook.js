/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { API } from "../../Config/api";

//Image
import logoPic from "../../Icon/Icon.png";
import profilePic from "../../Icon/ProfilePic.png";

import addBook from "../../Icon/addBook.svg";
import logout from "../../Icon/logout.svg";
import addBookWhite from "../../Icon/addBookWhite.svg";

//context
import { AppContext } from "../../Context/globalContext";

import "./AddBook.css";
import "../../spinner.css";

const AddBook = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(AppContext);

  const goTransaction = () => {
    history.push(`/transaction`);
  };
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const [addBookFormData, setAddBookFormData] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    author: "",
    isbn: "",
    price: "",
    description: "",
    bookFile: null,
    thumbnail: null,
  });

  const onChange = (e) => {
    const updateForm = { ...addBookFormData };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setAddBookFormData(updateForm);
  };

  const {
    title,
    publicationDate,
    pages,
    isbn,
    author,
    price,
    description,
    bookFile,
    thumbnail,
  } = addBookFormData;

  const handleClose = () => setShow(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("title", title);
      body.append("publicationDate", publicationDate);
      body.append("pages", pages);
      body.append("author", author);
      body.append("isbn", isbn);
      body.append("price", price);
      body.append("description", description);
      body.append("pdfFile", bookFile);
      body.append("imageFile", thumbnail);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      setLoading(true);
      await API.post("/book", body, config);
      setLoading(false);

      setAddBookFormData({
        title: "",
        publicationDate: "",
        pages: "",
        author: "",
        isbn: "",
        price: "",
        description: "",
        bookFile: null,
        thumbnail: null,
      });

      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="transaction-body">
      <div className="container-fluid">
        <div className="row">
          <div>
            <img className="logos" src={logoPic} alt="" />
          </div>
          <div className="col-md-10"></div>
          <div>
            <div class="dropdown">
              <img className="foto" src={profilePic} alt="" />
              <div class="dropdown-content">
                <a onClick={goTransaction}>
                  <img src={addBook} alt="" />
                  Transaction
                </a>
                <a onClick={() => dispatch({ type: "LOGOUT" })}>
                  <img src={logout} alt="" /> Logout
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row transaction-content">
          <div className="col-md-12">
            <p className="transaction-header">Add Book</p>
          </div>
        </div>

        <div className="row transaction-content">
          <div className="col-md-12">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  name="title"
                  value={title}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <input
                  name="publicationDate"
                  value={publicationDate}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Publication Date"
                />
              </div>
              <div className="form-group">
                <input
                  name="pages"
                  value={pages}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Pages"
                />
              </div>
              <div className="form-group">
                <input
                  name="author"
                  value={author}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Author"
                />
              </div>
              <div className="form-group">
                <input
                  name="isbn"
                  value={isbn}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="ISBN"
                />
              </div>
              <div className="form-group">
                <input
                  name="price"
                  value={price}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Price"
                />
              </div>
              <div className="form-group">
                <input
                  name="description"
                  value={description}
                  onChange={(e) => onChange(e)}
                  style={{
                    borderStyle: "solid",
                    borderColor: "#bcbcbc",
                    borderWidth: "2px",
                    backgroundColor: "rgba(188, 188, 188, 0.25)",
                  }}
                  type="textarea"
                  class="form-control"
                  placeholder="About This Book"
                />
              </div>
              <div className="form-group">
                <input
                  name="bookFile"
                  onChange={(e) => onChange(e)}
                  type="file"
                  id="actual-btn"
                  className="form-control"
                  placeholder="Attach Book File"
                  hidden
                />
                <label
                  for="actual-btn"
                  style={{
                    borderStyle: "solid",
                    borderColor: "#bcbcbc",
                    borderWidth: "2px",
                    backgroundColor: "rgba(188, 188, 188, 0.25)",
                    padding: "5px",
                  }}
                >
                  Attache Book File
                </label>
              </div>
              <div className="form-group">
                <input
                  name="thumbnail"
                  onChange={(e) => onChange(e)}
                  type="file"
                  id="actual-btn2"
                  className="form-control"
                  placeholder="Attach thumbnail"
                  hidden
                />
                <label
                  for="actual-btn2"
                  style={{
                    borderStyle: "solid",
                    borderColor: "#bcbcbc",
                    borderWidth: "2px",
                    backgroundColor: "rgba(188, 188, 188, 0.25)",
                    padding: "5px",
                  }}
                >
                  Attach thumbnail
                </label>
              </div>
              <div className="form-group">
                <button className="btn btn-danger" type="submit">
                  Send{"  "}
                  <img src={addBookWhite} alt="" />{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body style={{ color: "#29BD11" }}>
            Add Book Successful
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default AddBook;
