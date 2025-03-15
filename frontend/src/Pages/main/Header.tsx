import { useEffect, useState } from 'react';
import axios from 'axios'; // axios import edilmesi gerekiyor
import { config } from '../../configs/config';
import { IoIosExit } from 'react-icons/io';
import { FaFemale, FaMale, FaShoppingCart } from 'react-icons/fa';
import { MdClose, MdRestaurantMenu } from 'react-icons/md';
import { BiLogoGmail } from "react-icons/bi";
import { GoLaw } from 'react-icons/go';
import { motion } from 'framer-motion';
import { Exit, GoUsers, menuSec, verifyControl } from '../../configs/System';
import Modal from '../../components/Modal';
import { IoInformationCircle } from 'react-icons/io5';
import { Toaster, toast } from 'react-hot-toast';
import {Alert} from "@heroui/alert";



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [gender, setGender] = useState<string | null>(null);
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setIsSubmitting(true);
  
    try {
      const response = await axios.post('http://localhost:5000/api/messages', {
        username: storedValue,
        gender: gender,
        message: message,
      });
  
      console.log(response.data);
  
      toast.success("Message Successfully sent!", {
        style: {
          backgroundColor: 'white',
          color: 'black'
        }
      });
  
      setMessage('');
    } catch (error) {
      alert('Message could not be sent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

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

  const toggleHelp = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <> 
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <motion.img
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              src={config.favicon}
              alt="Company Logo"
              className="h-12 w-12 rounded-full border-2 border-white cursor-pointer"
              onClick={verifyControl}
            />
            <div className="flex flex-col items-start">
              <h1 className="text-white font-bold text-lg cursor-pointer" onClick={verifyControl}>
                {config.resturant}
              </h1>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'darkblue', textDecoration: 'underline', cursor: 'pointer' }}
                onClick={GoUsers}
              >
                {gender === "Male" ? (
                  <div className="flex items-center"><FaMale className="mr-2" />Mr. {storedValue}</div>
                ) : gender === "Female" ? (
                  <div className="flex items-center"><FaFemale className="mr-2" />Mrs. {storedValue}</div>
                ) : (
                  <>{storedValue}</>
                )}
              </motion.span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="/verified"
              className="cursor-pointer text-white hover:text-blue-300 transition duration-300 text-xl"
            >
              <GoLaw style={{fontSize:'28px'}}/>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={Exit}
              href="/"
              className="cursor-pointer text-white hover:text-blue-300 transition duration-300 text-xl"
            >
              <IoIosExit style={{fontSize:'28px'}}/>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={menuSec}
              className="cursor-pointer text-white hover:text-blue-300 transition duration-300 text-xl"
            >
              <MdRestaurantMenu style={{fontSize:'28px'}}/>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="/information"
              className="cursor-pointer text-white hover:text-blue-300 transition duration-300 text-xl"
            >
              <IoInformationCircle style={{fontSize:'28px'}}/>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="/cart"
              className="cursor-pointer text-white hover:text-blue-300 transition duration-300 text-xl"
            >
              <FaShoppingCart style={{fontSize:'28px'}}/>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={`mailto:${config.mail}`}
              className="cursor-pointer text-white hover:text-blue-300 transition duration-300"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/666/666162.png" alt="mail" className="h-8" />
            </motion.a>
            <motion.select
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-gray-700"
            >
              <option value="en">EN</option>
              <option value="tr">TR</option>
              <option value="de">DE</option>
            </motion.select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleHelp}
              style={{fontFamily:'Space Grotesk, serif'}}
              className="ml-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Support
            </motion.button>
          </nav>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg`}
        >
          <a href="/information" className="block py-3 px-4 text-gray-700 hover:bg-blue-50 transition duration-300">About</a>
          <a href="/cart" className="block py-3 px-4 text-gray-700 hover:bg-blue-50 transition duration-300">Cart</a>
          <a onClick={() => setIsHelpOpen(true)} className="block py-3 px-4 text-gray-700 hover:bg-blue-50 transition duration-300">Report</a>
          <a onClick={() => setIsHelpOpen(true)} className="block py-3 px-4 text-gray-700 hover:bg-blue-50 transition duration-300">Send Message</a>
          <div className="px-4 py-3 border-t border-gray-200">
            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              <option value="en">EN</option>
              <option value="tr">TR</option>
              <option value="de">DE</option>
            </select>
          </div>
          <div className="px-4 py-3">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/"
              onClick={Exit}
              className="block w-full text-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Exit
            </motion.a>
          </div>
        </motion.div>
      </header>

      <Modal isOpen={isHelpOpen} >
      <MdClose className='cursor-pointer hover:bg-gray-300 rounded-md' onClick={() => setIsHelpOpen(false)} size={24} />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold text-gray-800 text-center"
      >
        Hello, <strong className="text-blue-600">{storedValue}</strong>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-600 text-center"
      >
        Is there a problem?
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex gap-2"
      >
        <input
          className="placeholder:text-white bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md w-full py-2 px-4 focus:outline-none"
          placeholder={storedValue as string | undefined}
          disabled
        />        {/* Male: #3B82F6 Female: #EC4899 */}
        {gender == "Male" ? (
         <input
         className="bg-[#3B82F6] placeholder:text-white rounded-md w-full py-2 px-4 focus:outline-none"
         placeholder={gender}
         disabled
        />
        ) : gender == "Female" ? (
          <input
          className="bg-[#EC4899] placeholder:text-white rounded-md w-full py-2 px-4 focus:outline-none"
          placeholder={gender}
          disabled
        />
        ) : (
          <a>as</a>
        )}
      </motion.div>

      {/* Message Input's */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full"
      >
        <input
          onChange={handleMessageChange}
          value={message}
          className="w-full bg-gray-200 px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your message"
        />
      </motion.div>

      {/* Send Button */}
      <motion.button
        onClick={sendMessage}
        disabled={isSubmitting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{fontFamily:'Space Grotesk , serif'}}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
      >
                    {isSubmitting ? 'Sending...' : 'Send'}
      </motion.button>

      {/* Contact Icons */}
      <motion.a
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        href={`mailto:${config.mail}`}
        className="flex justify-center mt-4"
      >
        <BiLogoGmail className="text-3xl text-red-600 hover:text-red-700 transition-colors duration-300" />
      </motion.a>
     </motion.div>
    </Modal>
    <Toaster />
    </>
  );
};

export default Header;