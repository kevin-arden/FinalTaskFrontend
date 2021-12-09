/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { API } from "../../Config/api";
import Axios from "axios"
import NavBar from "../../Components/NavBar";

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
  const [imageState, setImageState] = useState()
  const [imageState2, setImageState2] = useState()
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
    image_id: "",
  });

  const onChange = (e) => {
    const updateForm = { ...addBookFormData };
    
    if(e.target.name === "thumbnail" && e.target.files && e.target.files[0]){
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      setImageState({
        image: URL.createObjectURL(e.target.files[0]),
      })
    }
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setAddBookFormData(updateForm);
    console.log(updateForm)
    
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
    image_id,
  } = addBookFormData;

  const handleClose = () => setShow(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();
      const image = new FormData();
      const pdf_upload = new FormData();
      body.append("title", title);
      body.append("publicationDate", publicationDate);
      body.append("pages", pages);
      body.append("author", author);
      body.append("isbn", isbn);
      body.append("price", price);
      body.append("description", description);
      // body.append("image_id", image_id);
      image.append("upload_preset", "myof9r9y");
      image.append("file", thumbnail);
      
      pdf_upload.append("upload_preset", "myof9r9y");
      pdf_upload.append("file", bookFile);
      
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      setLoading(true);
      await Axios.post("https://api.cloudinary.com/v1_1/kev-cloud/image/upload", image).then((response) => {
        body.append("image_id",response.data.url);
      })
      await Axios.post(
        "https://api.cloudinary.com/v1_1/kev-cloud/image/upload",
        pdf_upload
      ).then((response) => {
        body.append("bookAttachment", response.data.url);
      });
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
        image_id: ""
      });

      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="transaction-body">
        <div className="container-fluid">
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
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => onChange(e)}
                    style={{
                      borderStyle: "solid",
                      borderColor: "#bcbcbc",
                      borderWidth: "2px",
                      height: "200px",
                    }}
                    type="textarea"
                    class="form-control"
                    placeholder="About This Book"
                  />
                </div>
                <div className="grid-container">
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
                    <label for="actual-btn" className="upload_button">
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
                    <label for="actual-btn2" className="btn upload_button">
                      Attach thumbnail
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="book-preview">
                    <label for="filebook_preview">File:</label>
                    <text className="filebook" id="filebook_preview">
                      {addBookFormData.bookFile
                        ? addBookFormData.bookFile.name
                        : null}
                    </text>
                    <label for="img_preview">Image:</label>
                    <img
                      id="img_preview"
                      src={imageState ? imageState.image : null}
                      width="400"
                    />
                  </div>
                </div>
                <div className="menu-align-right">
                  <div className="form-group">
                    <button className="btn btn-danger" type="submit">
                      Send{"  "}
                      <img src={addBookWhite} alt="" />{" "}
                    </button>
                  </div>
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
    </div>
  );
};

export default AddBook;
