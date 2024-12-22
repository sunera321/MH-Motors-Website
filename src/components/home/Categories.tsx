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
    image: 'https://plus.unsplash.com/premium_photo-1677009540975-01b905eafb64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJha2UlMjBzeXN0ZW1zfGVufDB8fDB8fHww',
    description: 'Complete brake solutions for safety and reliability'
  },
  {
    title: 'Suspension Parts',
    image: 'https://images.unsplash.com/photo-1715545415004-7f30b0379365?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Suspension components for smooth operation'
  },
  {
    title: 'Body Parts',
    image: 'https://plus.unsplash.com/premium_photo-1694394357585-489ad6c764a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'premium body parts crafted to enhance durability'
  },
  {
    title: 'Electrical Parts',
    image: 'https://images.unsplash.com/photo-1552656967-7a0991a13906?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'precision-engineered electrical components for consistent power'
  },
  {
    title: 'Lubricants',
    image: 'https://images.unsplash.com/photo-1590227763209-821c686b932f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'top-grade lubricants for superior engine protection and efficient operation'
  }
  
];

export default function Categories() {
  return (
    <section id="categories" className="py-16 bg-gray-50">
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