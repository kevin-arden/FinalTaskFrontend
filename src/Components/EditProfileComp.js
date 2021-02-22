/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../Config/api";
//css
import "../App.css";

//context
import { AppContext } from "../Context/globalContext";

const editProfile = () => {
  let history = useHistory();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const showingModalEditProfile = () => setShow(true);

  const closingModalEditProfile = () => setShow(false);

  const [state, dispatch] = useContext(AppContext);

  const [profile, setProfile] = useState({
    email: "",
    gender: "",
    phone: "",
    avatar: "",
  });

  const getProfile = async () => {
    try {
      setLoading(true);
      const getProfile = await API.get(`/profile`);

      const profileData = getProfile.data.data.users;
      setProfile(profileData);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const { email, gender, phone, avatar } = profile;

  const onChange = (e) => {
    const updateForm = { ...profile };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setProfile(updateForm);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body2 = new FormData();
      body2.append("email", email);
      body2.append("gender", gender);
      body2.append("phone", phone);

      // body.append("avatar", avatar);

      // const body = JSON.stringify({
      //   email,
      //   gender,
      //   phone,
      // });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      setLoading(true);

      const user = await API.patch("/user", body2, config);

      setLoading(false);

      setProfile({
        email: "",
        gender: "",
        phone: "",
        avatar: "",
      });

      closingModalEditProfile();

      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
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

      <Modal
        show={show}
        onHide={closingModalEditProfile}
        dialogClassName="modal-main"
      >
        <Modal.Body>
          <div className="sign-body">
            <p className="sign-header">Edit profile</p>

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
                  name="gender"
                  value={gender}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="Gender"
                />
              </div>
              <div className="form-group">
                <input
                  name="phone"
                  value={phone}
                  onChange={(e) => onChange(e)}
                  type="text"
                  class="form-control"
                  placeholder="phone"
                />
              </div>
              <div className="form-group">
                <input
                  name="avatar"
                  onChange={(e) => onChange(e)}
                  type="file"
                  class="form-control"
                  placeholder="avatar"
                />
              </div>
              <div className="form-group">
                <button
                  className="btn"
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "36px",
                    marginBottom: "21px",
                    backgroundColor: "#393939",
                    color: "white",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default editProfile;
