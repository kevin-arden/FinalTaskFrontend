import React from "react";
import "../list.css";
import trashcan from "../Icon/trashcan.svg";
import { Image } from "cloudinary-react";

const List = ({ product, removeProductFromCart }) => {
  const { id, price, title, thumbnail, author, image_id } = product;
  console.log(thumbnail);
  return (
    <li
      style={{
        height: "200px",
        backgroundColor: "none",
      }}
      class="list-group-item d-flex "
    >
      <Image
        style={{ height: 175, width: 130 }}
        cloudName="kev-cloud"
        publicId={image_id}
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
