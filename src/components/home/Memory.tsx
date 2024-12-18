import React, { useState } from 'react';

export default function Memory() {
  // Memory card data array
  const memoryCards = [
    {
      id: 1,
      imgSrc: 'https://images.unsplash.com/photo-1719937206667-ac87c15ad3e9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Memory 1',
    },
    {
      id: 2,
      imgSrc: 'https://images.unsplash.com/photo-1734227267138-b886e9b0a954?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Memory 2',
    },
    {
      id: 3,
      imgSrc: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      alt: 'Memory 3',
    },
    {
      id: 4,
      imgSrc: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      alt: 'Memory 4',
    },
    {
      id: 5,
      imgSrc: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      alt: 'Memory 5',
    },
  ];

  // State to track the active image index
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to go to the next image
  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % memoryCards.length);
  };

  // Function to go to the previous image
  const prevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + memoryCards.length) % memoryCards.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">Our Memories</h2>

        <div id="controls-carousel" className="relative w-full" data-carousel="static">
          {/* Carousel wrapper */}
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {memoryCards.map((card, index) => (
              <div
                key={card.id}
                className={`${
                  index === activeIndex ? 'block' : 'hidden'
                } duration-700 ease-in-out`}
              >
                <img
                  src={card.imgSrc}
                  className="absolute block w-5/6 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt={card.alt}
                />
              </div>
            ))}
          </div>
          {/* Slider controls */}
          <button
            type="button"
            onClick={prevImage}
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            onClick={nextImage}
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
