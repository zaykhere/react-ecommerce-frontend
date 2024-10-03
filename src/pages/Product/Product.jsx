import React, { useState } from "react";
import "./product.scss";
import { AddShoppingCart, Balance, FavoriteBorder } from "@mui/icons-material";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

const Product = () => {
  const id = useParams().id;

  // const images = [
  //   "https://mendeez.com/cdn/shop/files/10-2_634e3f50-ff7f-4582-9b8a-aca9c3457f37.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1723905145&width=900/",
  //   "https://mendeez.com/cdn/shop/files/12-2_7b190bbf-f4f6-441c-8ebe-bc6ddc572514.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1723905135&width=900/",
  // ];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const {data, loading, error} = useFetch(`/products/${id}?populate=*`);

  return (
    <div className="product">
      {loading && (
         <Skeleton variant="rectangular" width={1000} height={860} />
      )}
      {data && (
        <>
           <div className="left">
        <div className="images">
          <img src={`${import.meta.env.VITE_UPLOAD_URL}${data.img.url}`} alt="" onClick={() => setSelectedImage(`${import.meta.env.VITE_UPLOAD_URL}${data.img.url}`)} />
          <img src={`${import.meta.env.VITE_UPLOAD_URL}${data.img2.url}`}  alt="" onClick={() => setSelectedImage(`${import.meta.env.VITE_UPLOAD_URL}${data.img2.url}`)} />
        </div>
        <div className="mainImg">
          <img src={selectedImage ? selectedImage : `${import.meta.env.VITE_UPLOAD_URL}${data.img.url}`} alt="" />
        </div>
      </div>
      <div className="right">
        <h1>{data.title}</h1>
        <span> ${data.price} </span>
        <p>
          {data.desc}
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
        </>
      )}
     
    </div>
  );
};

export default Product;
