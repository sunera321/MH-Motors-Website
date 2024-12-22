import React from 'react'
import Hero from './home/Hero';
import Features from './home/Features';
import Categories from './home/Categories';
import History from './home/History';
// import Memories from './home/Memories';
import Location from './home/Location';
import Memory from './home/Memory';
import AboutUs from './home/AboutUs';
 


const Main = () => {
  return (
    <div>
        <Hero />
      <Features />
      <AboutUs/>
      <Categories />
      <History />
      <Location/>
    </div>
  )
}

export default Main

