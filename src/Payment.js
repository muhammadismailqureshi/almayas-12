import React, { useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const handleSubmit= e =>{
        // do all the fancy stripe stuff here
    }

    const handleChange = (e) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details

        setDisabled(e.empty);
        setError(e.error? e.error.message : '');
    }

    return (
        <div className='payment'>
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>


                {/* paymeny section delivery address*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address: </h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>B# 27</p>
                        <p>Almayas</p>
                        <p>Pakistan</p>
                    </div>
                </div>



                {/* payment section -- Review Items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items</h3>
                        <h3>and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}                        
                            />
                            
                        ))}
                    </div>
                    
                    
                </div>
                
                {/* payment section -- Payment Method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit} >
                            <CardElement onChange={handleChange} />

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                
                                    renderText={(value) =>(
                                        
                                        <h3>
                                            Order Total: {value}
                                        </h3>

                                    )}

                                    
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeparator = {true}
                                    prefix={' PKR. '}

                                
                                />
                            </div>

                        </form>
                    </div>
                </div>
                    
            </div>

        </div>
    )
}

export default Payment