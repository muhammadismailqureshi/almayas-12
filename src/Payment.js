import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from 'axios';
import { db } from './firebase';

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();

    const navigate= useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");



    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer


        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            }

            );
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();




    }, [basket])

    console.log("THE SECRET IS >>>", clientSecret)
    console.log('😒', user)

    const handleSubmit= async (event) =>{
        // do all the fancy stripe stuff here
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentInetent = payment confirmation

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set(
                    {
                        basket: basket,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created
                    }
                )

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate("./orders", {replace: true})
            



        }
        )
        

        

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
                                <button disabled={processing || disabled || succeeded } >
                                    <span>{processing ? <p>Processing</p> : 
                                    "Buy Now" }</span>

                                </button>
                            </div>

                            {/* Error */}
                            {error && <div>{error}</div>}

                        </form>
                    </div>
                </div>
                    
            </div>

        </div>
    )
}

export default Payment