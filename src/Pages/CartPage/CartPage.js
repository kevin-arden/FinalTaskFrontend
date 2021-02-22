import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import List from "../../Components/List";
import { CartContext } from "../../Context/cartContext";
import NavBar from "../../Components/NavBar";
import { API } from "../../Config/api";
import inputLogo from "../../Icon/inputIcon.svg";
import background from "../../Icon/background.png";
import placeholder from "../../Icon/no_cover.jpg";
import "./CartPage.css";
import "../../insertImage.css";

const Cart = () => {
   const [{ alt, src }, setImg] = useState({
     src: placeholder,
     alt: "Upload an Image",
   });

   const handleImg = (e) => {
     if (e.target.files[0]) {
       setImg({
         src: URL.createObjectURL(e.target.files[0]),
         alt: e.target.files[0].name,
       });
     }
   };

  const [state, dispatch] = useContext(CartContext);
  const { carts } = state;
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [cartForm, setCartForm] = useState({
    totalPrice: 0,
    qty: 0,
    attachment: null,
  });

  const handleClose = () => setShow(false);
  const bookCart = carts.map((tst) => tst.id);

  const totalPrice = carts.reduce((accum, item) => accum + item.price, 0);

  const qty = Object.keys(carts).length;

  const onChange = (e) => {
    const updateForm = { ...cartForm };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setCartForm(updateForm);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("totalPayment", totalPrice);
      body.append("attachment", attachment);
      body.append("bookCart", bookCart);

      console.log(bookCart);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      setLoading(true);
      const buy = await API.post("/transaction", body, config);
      setLoading(false);

      setCartForm({
        totalPrice: 0,
        qty: 0,
        attachment: "",
        carts: [],
      });
      setImg({
        src: placeholder,
        alt: "Upload an image",
      });
      dispatch({
        type: "CLEAR_CART",
      });

      console.log(cartForm);

      setShow(true);

      console.log(buy);
    } catch (err) {
      console.log(err);
    }
  };

  const { attachment } = cartForm;

  const removeProductFromCart = (id) => {
    dispatch({
      type: "REMOVE_CART",
      payload: {
        id,
      },
    });
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(${background})`,
        borderColor: "#F3F3F3",
        height: "100%",
      }}
    >
      <NavBar />
      <div className="cart-content">
        <div className="row row-header">
          <div className="col-md-12">
            <h1>My Cart</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <h3>Review Your Order</h3>
            <hr style={{ backgroundColor: "black" }} />

            <ul class="list-group">
              {carts.length > 0 ? (
                carts.map((product) => (
                  <List
                    key={product.id}
                    product={product}
                    removeProductFromCart={removeProductFromCart}
                  />
                ))
              ) : (
                <h1 style={{ textAlign: "center" }}>Your Cart is Empty</h1>
              )}
            </ul>
            <hr style={{ backgroundColor: "black" }} />
          </div>

          <div className="col-md-4">
            <h3 className="mb-3">Checkout</h3>
            <hr style={{ backgroundColor: "black" }} />
            <form onSubmit={(e) => onSubmit(e)}>
              <p className="alignleft">
                Subtotal<p className="alignright">{totalPrice}</p>
              </p>

              <p className="alignleft">
                Qty <p className="alignright">{qty}</p>
              </p>

              <hr style={{ backgroundColor: "black" }} />

              <p className="price-tag alignleft">
                Total Price <p className="alignright">{totalPrice}</p>
              </p>

              <div className="form-group">
                <input
                  name="attachment"
                  onChange={(e) => onChange(e)}
                  onInput={handleImg}
                  type="file"
                  id="actual-btn3"
                  className="form-control"
                  placeholder="Attach proof of transfer"
                  hidden
                />

                <label for="actual-btn3">
                  <img src={src} alt={alt} className="form-img__img-preview" />
                </label>
              </div>
              <div className="form-group">
                <button
                  className="btn btn-block"
                  type="submit"
                  style={{
                    display: "block",
                    width: "100%",
                    marginTop: "36px",
                    marginBottom: "21px",
                    color: "white",
                    backgroundColor: "#393939",
                  }}
                >
                  Pay
                </button>
              </div>
            </form>
          </div>

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Body style={{ color: "#29BD11" }}>
              Thank you for ordering in us, please wait 1 x 24 hours to verify
              you order
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Cart;
