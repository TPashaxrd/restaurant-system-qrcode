import React, { useState } from "react";
import { Products } from "../../configs/Products";
import { IoEyeSharp } from "react-icons/io5";
import { MdClose, MdProductionQuantityLimits } from "react-icons/md";
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";

const ProductList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = Array.from(new Set(Products.map((product) => product.category)));

  const filteredProducts = selectedCategory
    ? Products.filter((product) => product.category === selectedCategory)
    : Products;

  const searchFilteredProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openProductModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  function addToCart(product: any) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const productIndex = cart.findIndex((item: any) => item.id === product.id);

    if (productIndex !== -1) {
      cart[productIndex].quantity += 1;
      toast.success(`Increased quantity: ${cart[productIndex].quantity}x`);
    } else {
      cart.push({ ...product, quantity: 1 });
      toast.success("Product added to cart!");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return (
    <>
      <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>Our Delicious Menu</h2>
        
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full transition-all duration-300 font-semibold ${selectedCategory === null
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
              }`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-semibold ${selectedCategory === category
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.toUpperCase()}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchFilteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {product.img && (
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <h4 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {product.name}
                </h4>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-orange-600">
                      ${product.price}
                    </span>
                    {product.discount && (
                      <span className="text-sm text-red-600 line-through">
                        ${product.discount}
                      </span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openProductModal(product)}
                    className="p-2 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 transition-colors duration-300"
                  >
                    <IoEyeSharp size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl"
              >
                <div className="flex justify-between items-center p-5 border-b">
                  <h3 className="flex text-2xl font-bold text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <MdProductionQuantityLimits className="mr-2" size={25} /> {selectedProduct.name}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeProductModal}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors duration-300"
                  >
                    <MdClose size={24} />
                  </motion.button>
                </div>
                <div className="p-5">
                  {selectedProduct.img && (
                    <img
                      src={selectedProduct.img}
                      alt={selectedProduct.name}
                      className="w-full h-56 object-cover rounded-md mb-4"
                    />
                  )}
                 <div className="border-t-2 border-gray-300 my-4"></div>
                  <div className="mt-4">
                    <p className="text-xl font-bold text-orange-600">
                      ${selectedProduct.price}
                    </p>
                    {selectedProduct.discount && (
                      <>
                        <p className="text-sm text-gray-400 line-through">
                          ${selectedProduct.discount}
                        </p>
                        <p className="text-green-500 text-sm mt-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {selectedProduct.ultDesc}
                        </p>
                      </>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(selectedProduct)}
                    className="w-full py-3 mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Toaster />
    </>
  );
};

export default ProductList;