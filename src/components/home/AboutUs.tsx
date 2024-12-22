import React from 'react';

function AboutUs() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Section */}
          <div className="flex flex-col justify-center gap-10">
            <div className="flex flex-col gap-4">
             
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-bold text-indigo-700 text-start">
                  The Story Behind Our Passion for Quality Vehicle Parts
                </h2>
                <p className="text-base text-gray-500">
                  For years, we have been dedicated to supplying top-quality vehicle parts to our
                  valued customers. With a commitment to excellence and a deep understanding of the
                  automotive industry, we have built a reputation for reliability and trust.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="p-4 transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-400">
                <h4 className="text-2xl font-bold text-gray-900">20+ Years</h4>
                <p className="text-gray-500">Serving the Automotive Community</p>
              </div>
              <div className="p-4 transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-400">
                <h4 className="text-2xl font-bold text-gray-900">10,000+ Parts</h4>
                <p className="text-gray-500">In Stock for All Major Brands</p>
              </div>
              <div className="p-4 transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-400">
                <h4 className="text-2xl font-bold text-gray-900">50+ Awards</h4>
                <p className="text-gray-500">Recognized for Excellence in Service</p>
              </div>
              <div className="p-4 transition-all duration-300 border border-gray-200 rounded-xl hover:border-gray-400">
                <h4 className="text-2xl font-bold text-gray-900">98% Happy Customers</h4>
                <p className="text-gray-500">Driven by Your Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-start justify-center p-10">
            <div className="relative w-full h-auto max-w-md p-1 border-gray-200 sm:max-w-lg sm:bg-gray-100 rounded-3xl sm:border">
              <img
                className="object-cover w-full h-5/6 rounded-3xl"
                src="https://images.unsplash.com/photo-1590227763209-821c686b932f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
