import { PlusCircle, Edit } from 'lucide-react';

const OwnerDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto">
        {/* Header Section */}
        <h1 className="mb-12 text-4xl font-extrabold text-center text-gray-800 md:text-5xl">
          Product Management Dashboard
        </h1>

        {/* Cards Section */}
        <div className="grid gap-10 mt-24 md:grid-cols-2 lg:grid-cols-2">
          {/* Add Product Card */}
          <div className="overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <PlusCircle className="w-12 h-12 mr-4 text-green-500" />
                <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
              </div>

              <p className="mb-6 text-gray-600">
                Create a new product to expand your inventory and grow your business.
              </p>

              <a href="/additems">
                <button className="flex items-center justify-center w-full px-4 py-3 font-medium text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600">
                  <PlusCircle className="w-6 h-6 mr-2" /> Add Product
                </button>
              </a>
            </div>
          </div>

          {/* Edit Product Card */}
          <div className="overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Edit className="w-12 h-12 mr-4 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
              </div>

              <p className="mb-6 text-gray-600">
                Modify the details of existing products to keep your catalog up-to-date.
              </p>

              <a href="/ownercatalog">
                <button className="flex items-center justify-center w-full px-4 py-3 font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600">
                  <Edit className="w-6 h-6 mr-2" /> Edit Product
                </button>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
