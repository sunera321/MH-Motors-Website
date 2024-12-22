import React from 'react';
import { Menu, Wrench } from 'lucide-react';
import { Link } from 'react-scroll';
import Logo from '../../asset/M H Motors.jpg'

export default function Header() {
  return (
    <header className="text-white bg-gray-900">
      <div className="container mx-auto px-">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">

            <img src={Logo} className='mt-1 w-14 h-14'></img>

            <h1 className="text-xl font-bold">M H Motors</h1>
          </div>

          <div className="items-center hidden space-x-8 md:flex">
            <nav>
              <ul className="flex space-x-6">
                <li><a href="/" className="transition-colors hover:text-yellow-500">Home</a></li>
                <li><a href="/cataloglist" className="transition-colors hover:text-yellow-500">Catalog</a></li>
                <li>


                  <Link
                    to="categories" // the id of the Categories section
                    smooth={true}
                    duration={500}
                    className="transition-colors hover:text-yellow-500"
                  >
                    Services
                  </Link>
                </li>

                <li>
                  <Link
                    to="Footer" // the id of the Categories section
                    smooth={true}
                    duration={500}
                    className="transition-colors hover:text-yellow-500"
                  >
                    Contact
                    </Link>
                    </li>
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