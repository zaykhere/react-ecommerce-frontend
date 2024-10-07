import React from "react";
import "./cart.scss";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {useSelector, useDispatch} from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import { makeRequest } from "../../makeRequest";

const Cart = () => {
  // const data = [
  //   {
  //     id: 1,
  //     img: "https://radstore.pk/cdn/shop/products/1C1A9074_360x.jpg?v=1676539370/", // Replace with a valid Pexels link
  //     img2: "https://radstore.pk/cdn/shop/files/1C1A3404_720x.jpg?v=1707402975", // Replace with a valid Pexels link
  //     title: "Long sleeve graphic t-shirt",
  //     isNew: true,
  //     oldPrice: 19,
  //     newPrice: 12,
  //     quantity: 1,
  //     price: 20
  //   },
  // ];

  const data = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    data.forEach((item) => (total += item.quantity * item.price));
    return total.toFixed(2);
  }

  const stripePromise = loadStripe("pk_test_51HLMIgAe7e74HIRPcTj50N1suvT6EXHEamBVcLkFLQcHPmqbqMA1m9fSYAn5hngqm9kBzBaVUueUXxeEiby67HOm00JyjtNPyu")

  async function handlePayment() {
    try {
      const stripe = await stripePromise;

      const res = await makeRequest.post("/orders", {products: data})

      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id
      })

    } catch (error) {
      
    }
  }

  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {data?.map((item) => (
        <div className="item" key={item.id}>
          <img src={import.meta.env.VITE_UPLOAD_URL+item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc?.substring(0, 100)}</p>
            <div className="price">
              {item.quantity} x ${item.price}
            </div>
          </div>
          <DeleteOutlinedIcon className="delete" onClick={() => dispatch(removeItem(item.id))} />
        </div>
      ))}

      <div className="total">
        <span>SUBTOTAL</span>
        <span>${totalPrice()}</span>
      </div>

      <button onClick={handlePayment}> PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={() => dispatch(resetCart())}>Reset cart</span>

    </div>
  );
};

export default Cart;
