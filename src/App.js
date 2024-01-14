
import {BrowserRouter as  Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';
import Order from './Order';


const promise = loadStripe('pk_test_51Ny5oMCllkDjlmChkG1TbOmt0oznTlfU2WrCBTDl4sh1myzJQlxFtPUl1LX3oRrbU8pQ3UL4r7y7O73rn5zoG9s100Z7ZVIBvz');



function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS: ', authUser);
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
        
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        });
        
      }

    })
  }, []);

  return (

    //BEM conventions for
    <Router>
      <div className="app">
        <Header />
       
        <Routes>
          <Route path="*" element = {<Home/>} />
          <Route path="/checkout" element = {<Checkout />} />
          <Route path="/header" element = {<Header />} />
          <Route path="/login" element = {<Login />} />
          <Route path="/payment" element = {<Elements stripe={promise}> <Payment /> </Elements> } />
          <Route path="/orders" element = {<Orders />} />
          <Route path="/order" element = {<Order />} />
          
        </Routes>  
      
      </div>
    </Router>
    
  );
}

export default App;





