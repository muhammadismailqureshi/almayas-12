import React from 'react';
import "./Checkout.css";
import Subtotal from './Subtotal';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
  const [{basket, user}, dispatch] =  useStateValue();
  return (
    <div className="checkout">
        <div className="checkout__left">
            <a href ="https://clicks.pipaffiliates.com/c?m=125133&c=858518">
            <img src="https://ads.pipaffiliates.com/i/125133?c=858518" 
            alt=""
            className="checkout__ad"
            />
            </a>
            <div>
                <h3>Hello, {user?.email}</h3>
                <h2 className="checkout__title">Your Shopping Basket</h2>

                {basket.map(item =>(
                  <CheckoutProduct 
                    id={item.id}
                    title = {item.title}
                    image = {item.image}
                    price = {item.price}
                    rating = {item.rating}
                    />
                ))}


                {/* CartItem */}
                {/* CartItem */}
                {/* CartItem */}
                {/* CartItem */}
            </div>  
        </div>
        <div className="checkout__right">
            <Subtotal />
        </div>

    </div>
  )
}

export default Checkout
