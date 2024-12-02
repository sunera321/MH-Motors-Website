import React from 'react';
import CategoryCard from './CategoryCard';

const categories = [
  {
    title: 'Engine Parts',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: 'High-quality engine components for optimal performance'
  },
  {
    title: 'Brake Systems',
    image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: 'Complete brake solutions for safety and reliability'
  },
  {
    title: 'Suspension Parts',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: 'Suspension components for smooth operation'
  },
  {
    title: 'Engine Parts',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: 'High-quality engine components for optimal performance'
  },
  {
    title: 'Brake Systems',
    image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: 'Complete brake solutions for safety and reliability'
  },
  {
    title: 'Suspension Parts',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: 'Suspension components for smooth operation'
  }
  
];

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">Popular Categories</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}