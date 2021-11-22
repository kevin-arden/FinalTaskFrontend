import React, { useContext, useState, useEffect } from "react";
import { API } from "../../Config/api";
import { Modal } from "react-bootstrap";

import EditProfile from "../../Components/EditProfileComp";
import BookOwnedCard from "../../Components/BookOwnedCard";

//Icon
import mail from "../../Icon/mail.png";
import gender from "../../Icon/gender.png";
import phone from "../../Icon/phone.png";
import map from "../../Icon/map.png";
import profilepic from "../../Icon/profilepiclarge.png";
import background from "../../Icon/background.png";

//css
import "./Profile.css";
import "../../spinner.css";

//context
import { AppContext } from "../../Context/globalContext";

import NavBar from "../../Components/NavBar";

const ProfilePage = () => {
  const [state] = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [booksOwned, setBooksOwned] = useState([]);

  const [show, setShow] = useState(false);

  const showingModalEditProfile = () => setShow(true);

  const closingModalEditProfile = () => setShow(false);

  const [profile, setProfile] = useState({
    email: state.userLogin.email,
    gender: "",
    mobilePhone: "",
    address: "",
  });

  const getProfile = async () => {
    try {
      setLoading(true);
      const getProfile = await API.get(`/profile`);

      const profileData = getProfile.data.data.users;
      setProfile(profileData);
      console.log(getProfile);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getBook = async () => {
    try {
      setLoading(true);
      const allBook = await API.get("/books");

      setLoading(false);

      setBooks(allBook.data.data.book);

      console.log(allBook);
    } catch (err) {
      console.log(err);
    }
  };

  const bookOwn = () => {
    if (state.userLogin.bookOwned != null) {
      let book2 = state.userLogin.bookOwned.replace(/"/g, "");
      let book3 = book2.split(",");
      let book4 = book3.map((book) => parseInt(book));
      let book5 = books.filter((booklist) => book4.includes(booklist.id));
      console.log(book4);

      console.log(book5);
      setBooksOwned(book5);
    }
  };

  console.log(booksOwned);

  useEffect(() => {
    getProfile(state.userLogin.id);
    getBook();
  }, []);

  useEffect(() => {
    bookOwn();
  }, [books]);

  return (
    <div>
      <NavBar />
      <div
        className="App-header"
        style={{
          backgroundImage: `url(${background})`,
          borderColor: "#F3F3F3",
        }}
      >
        <div
          className="container-fluid"
          style={{
            height: "100%",
            paddingLeft: "200px",
            paddingRight: "200px",
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="profileContent">
                <p className="profile">Profile</p>
                <div className="box">
                  <div className="col-md-7 left-side">
                    <div className="item">
                      <div>
                        <img src={mail} alt="" />
                      </div>
                      <div className="textInner">
                        <p className="upperText">{profile.email}</p>
                        <p className="lowerText">Email</p>
                      </div>
                    </div>
                    <div className="item">
                      <div>
                        <img src={gender} alt="" />
                      </div>
                      <div className="textInner">
                        <p className="upperText">{profile.gender}</p>
                        <p className="lowerText">Gender</p>
                      </div>
                    </div>
                    <div className="item">
                      <div>
                        <img src={phone} alt="" />
                      </div>

                      <div className="textInner">
                        <p className="upperText">{profile.phone}</p>
                        <p className="lowerText">Mobile Phone</p>
                      </div>
                    </div>
                    <div className="item">
                      <div>
                        <img src={map} alt="" />
                      </div>

                      <div className="textInner">
                        <p className="upperText">{profile.address}</p>
                        <p className="lowerText">Address</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 right-side">
                    <img src={profilepic} alt="" />
                    <div>
                      <button
                        onClick={showingModalEditProfile}
                        className="btn"
                        style={{
                          width: "227px",
                          height: "50px",
                          marginTop: "36px",
                          marginBottom: "21px",
                          backgroundColor: "rgba(214, 0, 0, 1)",
                          color: "white",
                        }}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="profile">My List Book</p>
              <div className="book-content">
                {booksOwned.map((book) => (
                  <BookOwnedCard book={book} key={booksOwned.map((e) => e)} />
                ))}
              </div>
            </div>
          </div>
          <Modal
            show={show}
            onHide={closingModalEditProfile}
            dialogClassName="modal-main"
          >
            <Modal.Body>
              <EditProfile closingModalEditProfile={closingModalEditProfile} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
