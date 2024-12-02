import React from 'react'
import Hero from './home/Hero';
import Features from './home/Features';
import Categories from './home/Categories';
import History from './home/History';
// import Memories from './home/Memories';
import Location from './home/Location';
 


const Main = () => {
  return (
    <div>
        <Hero />
      <Features />
      <Categories />
      <History />
    
      <Location/>
    </div>
  )
}

export default Main

