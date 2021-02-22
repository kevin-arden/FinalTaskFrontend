import React, { useContext, useState, useEffect } from "react";
import { API } from "../../Config/api";
import { useHistory } from "react-router-dom";

//Component
import Card from "../../Components/Card";
import BestSeller from "../../Components/BestSeller";
import NavBar from "../../Components/NavBar";

//Image
import background from "../../Icon/background.png";

//context
import { AppContext } from "../../Context/globalContext";

//css
import "./LandingPage.css";

const LandingPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(AppContext);
  const history = useHistory();

  const goProfile = () => {
    history.push(`/profile`);
  };

  const getBook = async () => {
    try {
      setLoading(true);
      const allBook = await API.get("/books");
      setLoading(false);
      console.log(allBook);

      setBooks(allBook.data.data.book);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div>
      <NavBar />
      <div
        className="container-fluid"
        style={{
          backgroundImage: `url(${background})`,
          borderColor: "#F3F3F3",
        }}
      >
        <div className="row">
          <div className="col-md-12 landing-content">
            <p className="landing-text">With us, you can shop online & help</p>
            <p className="landing-text">
              save your high street at the same time
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 best-content">
            <div>
              {books.map((book, index) => (
                <BestSeller book={book} key={book.id} />
              ))}
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "60px" }}>
          <div className="col-md-12 outer-book-content">
            <div>
              <h1 style={{ marginBottom: "40px" }}>List Book</h1>
              <div className="book-content">
                {books.map((book, index) => (
                  <Card book={book} key={book.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
