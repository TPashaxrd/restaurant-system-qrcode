import { config } from '../../configs/config';
import { currentDate } from '../../configs/System';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-800 to-gray-900 text-center py-3 shadow-lg z-10">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm text-gray-300"
      >
        &copy; <strong className="text-red-400 hover:text-red-500 transition-colors duration-300">{config.resturant}</strong> &  
        <a
          href={config.complink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-500 font-semibold hover:underline ml-1 transition-colors duration-300"
        >
          {config.company}
        </a> 💗 {currentDate}
      </motion.p>
    </footer>
  );
};

export default Footer;