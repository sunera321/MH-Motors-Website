import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">About M H Motors</h3>
            <p className="text-gray-400">
              Leading provider of spare parts for buses and lorries since 1998.
              Committed to quality, reliability, and exceptional customer service.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Contact</a></li>
            
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-400">Kurunegala, Sri Lanka</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-400">+94 XX XXX XXXX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-400">info@mhmotors.lk</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} M H Motors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}