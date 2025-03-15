import { Helmet } from 'react-helmet';
import { config } from '../configs/config';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NoPage = () => {
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedValue = localStorage.getItem('username');
    if (savedValue) {
      setStoredValue(savedValue);
    }
  }, []);

  const backToMain = () => {
    navigate("/");
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <Helmet>
        <title>{config.resturant} | 404 No Page {location.pathname}</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex justify-center items-center py-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Oops! Page Not Found
          </h2>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Would you like to go back to the homepage?
            </h3>
            <p className="text-gray-600 mb-6" style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
              Hello, {storedValue ? `Mr./Ms. ${storedValue}` : "Guest"} | &nbsp;
              <strong>{location.pathname}</strong>
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={backToMain}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold"
                style={{ fontFamily: 'Atkinson Hyperlegible Next, sans-serif' }}
              >
                Home
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReload}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold"
                style={{ fontFamily: 'Atkinson Hyperlegible Next, sans-serif' }}
              >
                Reload
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NoPage;