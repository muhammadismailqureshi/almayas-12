import React from 'react';
import "./Home.css";
import Product from './Product';

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img 
            className='home__image' 
            src='images/home.png'
            alt='home'
            />

            <div className='home__row'>
                <Product 
                    id='10001'
                    title='the summer clothing for men and children of the world ...' 
                    price ={1500} 
                    image='./images/p1.jpg' 
                    rating={4}
                />

                <Product 
                    id='10002'
                    title='men casual shirt with all colors and prices available for purchase and use with customization' 
                    price ={1200} 
                    image='./images/p2.jpg' 
                    rating={2}
                />
                

                
            </div>
            <div className='home__row'>
                <Product 
                    id='10003'
                    title='men shalwar and kurta for the winter and summer with casual designs...' 
                    price ={1000} 
                    image='./images/p3.jpg' 
                    rating={1}
                />
                <Product 
                    id='10004'
                    title='aprons for medical students and for other desciplines also...' 
                    price ={1700} 
                    image='./images/p4.jpg' 
                    rating={3}
                />
                <Product 
                    id='10005'
                    title='shirts for professional customers looks appealing and unique' 
                    price ={2000} 
                    image='./images/p5.jpg' 
                    rating={4}
                />
                
            </div>
            <div className='home__row'>
                <Product
                    id='10006'
                    title='all kinds of casual shirts for men and children for all kinds of imagery and sesions that
                            are available in all kinds of imagery' 
                    price ={1400} 
                    image='./images/p6.jpg' 
                    rating={4} 
                />
                
            </div>


        </div>


      
    </div>
  )
}

export default Home
