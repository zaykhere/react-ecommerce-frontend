import React, { useState } from "react";
import "./product.scss";
import { AddShoppingCart, Balance, FavoriteBorder } from "@mui/icons-material";

const Product = () => {
  const images = [
    "https://mendeez.com/cdn/shop/files/10-2_634e3f50-ff7f-4582-9b8a-aca9c3457f37.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1723905145&width=900/",
    "https://mendeez.com/cdn/shop/files/12-2_7b190bbf-f4f6-441c-8ebe-bc6ddc572514.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1723905135&width=900/",
  ];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product">
      <div className="left">
        <div className="images">
          <img src={images[0]} alt="" onClick={() => setSelectedImage(0)} />
          <img src={images[1]} alt="" onClick={() => setSelectedImage(1)} />
        </div>
        <div className="mainImg">
          <img src={images[selectedImage]} alt="" />
        </div>
      </div>
      <div className="right">
        <h1>Title</h1>
        <span> $199 </span>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
          dolor eaque numquam officia fuga illum, perspiciatis eos dolores
          facere, asperiores velit, autem ex esse. Culpa, maiores dolores ipsam
          soluta facilis cumque. Labore laudantium voluptate tempora molestiae
          fuga aliquid repudiandae debitis!
        </p>
        <div className="quantity">
          <button onClick={() => setQuantity(prev=> prev === 1 ? 1 : prev - 1)}>-</button>
          {quantity}
          <button onClick={() => setQuantity(prev=> prev + 1)}>+</button>
        </div>
        <button className="add">
          <AddShoppingCart /> ADD TO CART
        </button>
        <div className="links">
          <div className="item">
            <FavoriteBorder /> ADD TO WISHLIST
          </div>
          <div className="item">
            <Balance /> ADD TO COMPARE
          </div>
        </div>

        <div className="info">
              <span>Vendor: Polo</span>
              <span>Product Type: T-Shirt</span>
              <span>Tag: T-Shirt, Women, Top</span>
            </div>
            <hr />
            <div className="info">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
      </div>
    </div>
  );
};

export default Product;
