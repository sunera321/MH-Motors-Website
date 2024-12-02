import React from 'react';
import { Menu, Wrench } from 'lucide-react';

export default function Header() {
  return (
    <header className="text-white bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Wrench className="w-8 h-8 text-yellow-500" />
            <h1 className="text-xl font-bold">M H Motors</h1>
          </div>

          <div className="items-center hidden space-x-8 md:flex">
            <nav>
              <ul className="flex space-x-6">
                <li><a href="/" className="transition-colors hover:text-yellow-500">Home</a></li>
                <li><a href="#" className="transition-colors hover:text-yellow-500">Catalog</a></li>
                <li><a href="#" className="transition-colors hover:text-yellow-500">Services</a></li>
                <li><a href="#" className="transition-colors hover:text-yellow-500">Contact</a></li>
                <li><a href="/login" className="transition-colors hover:text-yellow-500">Login</a></li>
              </ul>
            </nav>

          </div>

          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}