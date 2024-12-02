import React from 'react';
import { Shield, Truck, Clock, Wrench } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'All parts sourced from trusted suppliers and manufacturers, ensuring reliability and performance.'
  },
  {
    icon: Truck,
    title: 'Wide Selection',
    description: 'Comprehensive range of parts for buses, lorries, and commercial vehicles.'
  },
  {
    icon: Clock,
    title: 'Fast Service',
    description: 'Quick delivery and professional installation services to minimize vehicle downtime.'
  },
  {
    icon: Wrench,
    title: 'Expert Support',
    description: 'Skilled technicians and knowledgeable staff to assist with all your needs.'
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose M H Motors?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}