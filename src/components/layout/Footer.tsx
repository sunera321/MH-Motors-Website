
import {  Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="pt-5 pb-3 text-white bg-gray-900">
        <section id="Footer">
      <div className="container px-4 mx-auto">
        <div className="grid justify-around gap-12 mb-6 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold">About M H Motors</h3>
            <p className="text-gray-400">
              Leading provider of spare parts for buses and lorries since 1998.
              Committed to quality, reliability, and exceptional customer service.
            </p>
          </div>

          <div>
            <h3 className="mb-1 text-xl font-bold">Quick Links</h3>
            <ul className="col-span-2 space-y-2">
              <>
              <li><a href="#" className="text-gray-400 transition-colors hover:text-yellow-500">Home</a></li>
              <li><a href="#" className="text-gray-400 transition-colors hover:text-yellow-500">Products</a></li>
              <li><a href="#" className="text-gray-400 transition-colors hover:text-yellow-500">Services</a></li>
              </>
              <>
              <li><a href="#" className="text-gray-400 transition-colors hover:text-yellow-500">About Us</a></li>
              <li><a href="#" className="text-gray-400 transition-colors hover:text-yellow-500">Contact</a></li>
              </>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-400">184/4,Puththalama Rd,Kurunegala</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-400">037 222 5063</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-400">mhmotars.info@gmail.com</span>
              </li>
            </ul>
          </div>

          
        </div>

        <div className="pt-2 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © 2024 M H Motors. All rights reserved.
          </p>
        </div>
      </div>
      </section>
    </footer>
  );
}