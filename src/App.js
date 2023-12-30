
import {BrowserRouter as  Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

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
          <Route path="/" element = {<Home />} />
          <Route path="/home" element = {<Home />} />
          <Route path="/checkout" element = {<Checkout />} />
          <Route path="/login" element = {<Login />} />
        </Routes>  
      
      </div>
    </Router>
    
  );
}

export default App;





