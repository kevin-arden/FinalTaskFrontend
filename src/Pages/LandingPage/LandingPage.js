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
  const [promoBooks, setPromoBooks] = useState([]);
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

      let arrayBooks = allBook.data.data.book;
      arrayBooks.sort((a, b) =>
        a.title < b.title ? -1 : a.title > b.title ? 1 : 0
      );

      setBooks(arrayBooks);
    } catch (err) {
      console.log(err);
    }
  };

  const alphabeticalDescending = async () => {
    try {
      setLoading(true);
      const allBook = await API.get("/books");
      setLoading(false);
      console.log(allBook);

      let arrayBooks = allBook.data.data.book;
      arrayBooks.sort((a, b) =>
        a.title < b.title ? 1 : a.title > b.title ? -1 : 0
      );

      setBooks(arrayBooks);
    } catch (err) {
      console.log(err);
    }
  };

  const priceLowHigh = async () => {
    try {
      setLoading(true);
      const allBook = await API.get("/books");
      setLoading(false);
      console.log(allBook);

      let arrayBooks = allBook.data.data.book;
      arrayBooks.sort((a, b) =>
        a.price - b.price
      );

      setBooks(arrayBooks);
    } catch (err) {
      console.log(err);
    }
  };

  const priceHighLow = async () => {
    try {
      setLoading(true);
      const allBook = await API.get("/books");
      setLoading(false);
      console.log(allBook);

      let arrayBooks = allBook.data.data.book;
      arrayBooks.sort((a, b) => b.price - a.price);

      setBooks(arrayBooks);
    } catch (err) {
      console.log(err);
    }
  };

  const getPromoBook = async () => {
    try {
      setLoading(true);
      const allBook = await API.get("/promo");
      setLoading(false);
      console.log(allBook);
      let arrayBook = allBook.data.data.book;
      const priceOnly = ({ price }) => price;
      arrayBook.sort((a, b) => priceOnly(a) - priceOnly(b));

      setPromoBooks(arrayBook);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBook();
    getPromoBook();
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
              {promoBooks.map((book, index) => (
                <BestSeller book={book} key={book.id} />
              ))}
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "60px" }}>
          <div className="col-md-12 outer-book-content">
            <div>
              <h1 style={{ marginBottom: "40px" }}>List Book</h1>
              <div className="right-side">
                <div className="dropdown">
                  <p>Sort By</p>
                  <div className="dropdown-content">
                    <button className="dropdown-item" onClick={() => getBook()}>
                      Alphabetical Ascending
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => alphabeticalDescending()}
                    >
                      Alphabetical Descending
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => priceLowHigh()}
                    >
                      Price Low-High
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => priceHighLow()}
                    >
                      Price High-Low
                    </button>
                  </div>
                </div>
              </div>
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
