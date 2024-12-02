import React from 'react';
import MemoryCard from './MemoryCard';

const memories = [
  {
    title: 'First Store Opening',
    year: '1998',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: 'The beginning of our journey in Kurunegala'
  },
  {
    title: 'First Store Opening',
    year: '1998',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: 'The beginning of our journey in Kurunegala'
  },
  {
    title: 'First Store Opening',
    year: '1998',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: 'The beginning of our journey in Kurunegala'
  },
  {
    title: 'First Store Opening',
    year: '1998',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: 'The beginning of our journey in Kurunegala'
  }
];

export default function Memories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Memories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {memories.map((memory, index) => (
            <MemoryCard key={index} {...memory} />
          ))}
        </div>
      </div>
    </section>
  );
}