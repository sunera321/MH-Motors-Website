import React from 'react';

function AboutUs() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container px-4 mx-auto">
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Section */}
          <div className="flex flex-col justify-center gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl gray-400 text-font-normal ">About Us</h2>
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-bold text-indigo-700 text-start">
                  The Tale of Our Achievement Story
                </h2>
                <p className="text-base text-gray-500">
                  Our achievement story is a testament to teamwork and perseverance. Together, we've
                  overcome challenges, celebrated victories, and created a narrative of progress and
                  success.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="p-4 transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-400">
                <h4 className="text-2xl font-bold text-gray-900">33+ Years</h4>
                <p className="text-gray-500">Influencing Digital Landscapes Together</p>
              </div>
              <div className="p-4 transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-400">
                <h4 className="text-2xl font-bold text-gray-900">125+ Projects</h4>
                <p className="text-gray-500">Excellence Achieved Through Success</p>
              </div>
              <div className="p-4 transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-400">
                <h4 className="text-2xl font-bold text-gray-900">26+ Awards</h4>
                <p className="text-gray-500">Our Dedication to Innovation Wins Understanding</p>
              </div>
              <div className="p-4 transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-400">
                <h4 className="text-2xl font-bold text-gray-900">99% Happy Clients</h4>
                <p className="text-gray-500">Mirrors our Focus on Client Satisfaction</p>
              </div>
            </div>
            
          </div>

          {/* Right Section */}
          <div className="flex items-start justify-center">
            <div className="relative w-full h-auto max-w-md border-gray-200 sm:max-w-lg sm:bg-gray-100 rounded-3xl sm:border">
              <img
                className="object-cover w-full h-full rounded-3xl"
                src="https://pagedone.io/asset/uploads/1717742431.png"
                alt="About Us"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
