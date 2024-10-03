import React from "react";
import "./card.scss";
import {Link} from "react-router-dom";

const Card = ({item}) => {
  return (
    <Link to={`/product/${item.id}`} className="link">
        <div className="card">
            <div className="image">
                {item.isNew && <span> New Season </span>}
                <img src={`${import.meta.env.VITE_UPLOAD_URL}${item.img.url}`} alt="" className="mainImage" />
                <img src={`${import.meta.env.VITE_UPLOAD_URL}${item.img2.url}`} alt="" className="secondImage" />
            </div>
            <h2> {item.title} </h2>
            <div className="prices">
                <h3>${item.oldPrice || item.price + 20}</h3>
                <h3>${item.price}</h3>
            </div>
        </div>
    </Link>
  )
};

export default Card;
