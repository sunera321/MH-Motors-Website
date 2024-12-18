import { PlusCircle, Edit } from 'lucide-react';

const OwerDhshbord = () => {

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
          Product Management
        </h1>

        <div className="grid gap-8 pt-24 md:grid-cols-2">
          {/* Add Product Card */}
          <div className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <PlusCircle className="w-10 h-10 mr-4 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Add New Product
                </h2>
              </div>

              <p className="mb-6 text-gray-600">
                Create a new product to expand your inventory
              </p>
              <a href="/additems">
              <button 
                
                className="flex items-center justify-center w-full py-3 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Product
              </button>
              </a>
            </div>
          </div>

  
          <div className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Edit className="w-10 h-10 mr-4 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Edit Product
                </h2>
              </div>

              <p className="mb-6 text-gray-600">
                Modify details of existing products in your catalog
              </p>
              <a href="/ownercatalog">
              <button 
                
                className="flex items-center justify-center w-full py-3 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                <Edit className="w-5 h-5 mr-2" />
                Edit Product
              </button>
              </a>
            </div>
          </div>
        </div>

    
    
      </div>
    </div>
  );
}

export default OwerDhshbord;