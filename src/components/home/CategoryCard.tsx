import React from 'react';

interface CategoryCardProps {
  title: string;
  image: string;
  description: string;
}

export default function CategoryCard({ title, image, description }: CategoryCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
        <div 
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
      </div>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}