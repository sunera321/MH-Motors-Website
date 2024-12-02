import React from 'react';
import { Calendar, Award, Users, MapPin } from 'lucide-react';

const milestones = [
  {
    year: '1998',
    title: 'Foundation',
    description: 'Established by Mr. M H Hilmeen in Kurunegala',
    icon: Calendar
  },
  {
    year: '1998',
    title: 'Foundation',
    description: 'Established by Mr. M H Hilmeen in Kurunegala',
    icon: Award
  },
  {
    year: '1998',
    title: 'Foundation',
    description: 'Established by Mr. M H Hilmeen in Kurunegala',
    icon: Users
  },
  {
    year: '1998',
    title: 'Foundation',
    description: 'Established by Mr. M H Hilmeen in Kurunegala',
    icon: MapPin
  }
];

export default function History() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">Our Journey</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-yellow-500" />
          
          {/* Timeline items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="w-1/2" />
                  <div className="relative flex items-center justify-center">
                    <div className="z-10 flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="p-6 rounded-lg shadow-md bg-gray-50">
                      <span className="text-xl font-bold text-yellow-500">{milestone.year}</span>
                      <h3 className="mt-2 text-xl font-semibold">{milestone.title}</h3>
                      <p className="mt-2 text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}