import React, { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaDollarSign } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import Header from "./main/Header";
import Footer from "./main/Footer";
import QRCodeSystem from './main/QRCodeCart';
import { config } from "../configs/config";
import { isVerified } from "../configs/System";

const CartPage: React.FC = () => {
  const [cart, setCart] = React.useState<any[]>(() =>
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const updateCart = (updatedCart: any[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const addToCart = (product: any) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateCart(updatedCart);
      toast.success("Quantity increased!");
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      updateCart(newCart);
      toast.success("Product added to cart!");
    }
  };

  const increaseQuantity = (productId: string) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (productId: string) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    updateCart(updatedCart);
    toast.success("Product removed from cart!");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!isVerified) {
      window.location.href = "/verified";
    }
  }, []);

  return (
    <>
      <title>{config.resturant} | Cart</title>
      <Header />
      <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Your Cart
        </h2>
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(90deg, #ff7a18, #af002d 100%)',
                color: '#fff',
                padding: '12px 24px',
                fontSize: '16px',
                borderRadius: '20px',
                textDecoration: 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onClick={() => { window.location.href = "verified" }}
            >
              Look Menu
            </motion.button>
          </motion.div>
        ) : (
          <>
            <div className="overflow-x-auto whitespace-nowrap pb-4">
              <div className="flex gap-6">
                {cart.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl shadow-lg p-4 w-64 flex-shrink-0 hover:shadow-xl transition-shadow duration-300"
                  >
                    {product.img && (
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-40 object-cover rounded-md"
                      />
                    )}
                    <h4 className="text-lg font-semibold text-gray-800 mt-3">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-blue-600">
                        ${product.price} x {product.quantity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => decreaseQuantity(product.id)}
                        className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                      >
                        -
                      </motion.button>
                      <span className="text-lg font-bold">{product.quantity}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => increaseQuantity(product.id)}
                        className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                      >
                        +
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(product.id)}
                        className="p-2 hover:bg-red-600 bg-red-500 text-white rounded-lg transition-colors duration-300"
                      >
                        <MdClose size={20} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="flex text-xl font-bold text-gray-800 justify-center items-center">
                Total: <FaDollarSign className="mt-1 ml-1" />{totalPrice.toFixed(2)}
              </p>
            </div>
            {/* QR Code System Start*/}
            <QRCodeSystem />
            {/* QR Code System End */}
          </>
        )}
        <Toaster />
      </div>
      <button onClick={() => addToCart(1)}></button>
      <Footer />
    </>
  );
};

export default CartPage;