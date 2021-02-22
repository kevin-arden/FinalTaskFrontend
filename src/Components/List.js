import React from "react";
import "../list.css";
import trashcan from "../Icon/trashcan.svg";

const List = ({ product, removeProductFromCart }) => {
  const { id, price, title, thumbnail, author } = product;
  console.log(thumbnail);
  return (
    <li
      style={{
        height: "200px",
        backgroundColor: "none",
      }}
      class="list-group-item d-flex "
    >
      <img
        src={`http://localhost:5000/image/${thumbnail}`}
        alt="image"
        style={{
          height: "175px",
          width: "130px",
          objectFit: "cover",
        }}
      />
      <div className="container-fluid">
        <h4 className="alignleft">
          {title}
          <h4
            className="alignright"
            style={{
              cursor: "pointer",
            }}
            onClick={() => removeProductFromCart(id)}
          >
            <img src={trashcan} alt="" />
          </h4>
        </h4>

        <p className="text-secondary">{author}</p>
        <p className="price-tag">Rp {price}</p>
      </div>
    </li>
  );
};

export default List;
