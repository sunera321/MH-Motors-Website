import React from 'react';

interface MemoryCardProps {
  title: string;
  year: string;
  image: string;
  description: string;
}

export default function MemoryCard({ title, year, image, description }: MemoryCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full font-semibold">
          {year}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}