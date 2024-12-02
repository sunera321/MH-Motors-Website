import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-[600px] bg-gray-900">
      <div 
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          opacity: '0.4'
        }}
      />
      <div className="container relative flex items-center h-full px-4 mx-auto">
        <div className="max-w-2xl">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Your Trusted Partner in Commercial Vehicle Parts
          </h1>
          <p className="mb-8 text-lg text-gray-300">
            Established in 1998, M H Motors is the leading provider of high-quality spare parts
            for buses and lorries in Kurunegala and surrounding regions.
          </p>
          <div className="flex space-x-4">
            <a href='/cataloglist'>
            <button className="px-6 py-3 font-semibold text-gray-900 transition-colors bg-yellow-500 rounded-lg hover:bg-yellow-400">
              Browse Catalog
            </button>
            </a>
          
          </div>
        </div>
      </div>
    </div>
  );
}