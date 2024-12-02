import React from 'react'

const Cover = () => {
  return (
    <div className="relative text-white bg-blue-700">
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2000&q=80"
        alt="Auto Parts Background"
        className="object-cover w-full h-full opacity-20"
      />
    </div>
    <div className="relative mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-16">
      <div className="md:w-2/3">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Quality Auto Parts for Every Vehicle
        </h1>
        <p className="max-w-3xl mt-6 text-xl text-blue-100">
          Discover our extensive catalog of genuine and aftermarket parts. 
          We provide top-quality components to keep your vehicle running at its best.
        </p>
 
      </div>
    </div>
  </div>
  )
}

export default Cover