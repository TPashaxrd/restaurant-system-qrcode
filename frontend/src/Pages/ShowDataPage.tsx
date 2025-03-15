import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaTransgender } from 'react-icons/fa';
import { IoMale } from 'react-icons/io5';
import { IoIosFemale } from 'react-icons/io';
import { motion } from 'framer-motion';
import { DateTime } from 'luxon';
import { config } from '../configs/config';
import { Exit, GoBack } from '../configs/System';
import Header from './main/Header';
import Footer from './main/Footer';

const ShowDataPage = () => {
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  useEffect(() => {
    const savedValue = localStorage.getItem('username');
    if (savedValue) {
      setStoredValue(savedValue);
    }
  }, []);

  useEffect(() => {
    const storedGender = localStorage.getItem("gender");
    if (storedGender) {
      setGender(storedGender);
    }
  }, []);

  const renderGenderIcon = () => {
    if (gender === "Male") {
      return <IoMale className="ml-2" size={20} />;
    } else if (gender === "Female") {
      return <IoIosFemale className="ml-2" size={20} />;
    } else if (gender === "Other") {
      return <FaTransgender className="ml-2" size={20} />;
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>{config.resturant} | Show Data</title>
      </Helmet>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex justify-center items-center py-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Saved User Data
          </h2>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">
              <span className="text-red-400">Hello,</span>
              {gender === "Male" ? (
                <p className="text-gray-800">Mr. {storedValue}</p>
              ) : gender === "Female" ? (
                <p className="text-gray-800">Mrs. {storedValue}</p>
              ) : gender === "Other" ? (
                <p className="text-gray-800">{storedValue}</p>
              ) : null}
            </h3>
            <br />
            <h3 className="flex items-center text-gray-700">
              <strong>Gender:</strong>
              <span className="flex items-center ml-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {renderGenderIcon()}
              </span>
            </h3>
            <p className="text-gray-700 mt-2">
              <strong>Date:</strong> {DateTime.now().toLocaleString(DateTime.DATETIME_MED)}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { Exit(); GoBack(); }}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg mt-6 font-semibold transition-all duration-300"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Exit
          </motion.button>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default ShowDataPage;