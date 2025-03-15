import { motion } from 'framer-motion';
import Header from "./main/Header";
import Footer from "./main/Footer";
import { config } from '../configs/config';

const ResInfo = () => {
  return (
    <>
      <Header />
      {/* Restaurant Information Start */}
      <div style={{marginTop:'-10px'}} className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-800">About Our Restaurant</h1>
            <p className="text-lg text-gray-600 mt-4">Delicious meals, a cozy atmosphere, and excellent service!</p>
          </motion.div>

          {/* İçerik Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Restoran Hakkında Bilgi */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800">{config.resturant} Restaurant</h2>
              <p className="text-gray-600 mt-4">
                {config.aboutOne}
              </p>
              <p className="text-gray-600 mt-4">
                {config.aboutTwo}
              </p>
            </motion.div>

            {/* Özellikler Listesi */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800">Features</h2>
              <ul className="mt-4 space-y-3">
                {[
                  "Local and organic ingredients",
                  "Hot and cold drink options",
                  "High Quality Flavor!",
                  "Rich menu options",
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-2">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            <p className="text-lg text-gray-600 mt-4">Address: {config.location}</p>
            <p className="text-lg text-gray-600">
              Phone: <a href={`tel:${config.phone}`} className="text-blue-500 hover:underline">{config.phone}</a>
            </p>
            <p className="text-lg text-gray-600">
              Email: <a href={`mailto:${config.mail}`} className="text-blue-500 hover:underline">{config.mail}</a>
            </p>
          </motion.div>
        </div>
      </div>
      {/* Restaurant Information End */}
      <Footer />
    </>
  );
};

export default ResInfo;