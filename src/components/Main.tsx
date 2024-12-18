import React from 'react'
import Hero from './home/Hero';
import Features from './home/Features';
import Categories from './home/Categories';
import History from './home/History';
// import Memories from './home/Memories';
import Location from './home/Location';
import Memory from './home/Memory';
 


const Main = () => {
  return (
    <div>
        <Hero />
      <Features />
      <Categories />
      <History />
      <Memory/>
      <Location/>
    </div>
  )
}

export default Main

