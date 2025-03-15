import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaCopy, FaShare, FaExpand } from "react-icons/fa";
import QRCode from "react-qr-code";
import { DateTime } from 'luxon';
import { config } from "../../configs/config";
import { motion } from "framer-motion";
import Modal from '../../components/Modal';
import { MdClose } from "react-icons/md";

const QRCodeComponent: React.FC = () => {
  const [text, setText] = useState("");
  const [qrText, setQrText] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const currentDate = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedValue = localStorage.getItem('username');
    if (savedValue) {
      setStoredValue(savedValue);
    }
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productNames = storedCart.map((item: any) => item.name).join(", ");
    setCart(storedCart);
    setQrText(productNames || "Cart is Empty!");
  }, []);

  const generateQRCode = () => {
    if (text.trim() !== "") {
      setQrText(`${config.resturant} Order\nExtra Note: ${text}\nDate: ${currentDate}\nName: ${storedValue}\nCart: ${cart.map(item => item.name).join(", ")}`);
    } else {
      setQrText(`Cart: ${cart.map(item => item.name).join(", ")}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrText)
      .then(() => {
        toast.success("QR Code copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy QR Code.");
      });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "QR Code",
          text: "Check out my Cart QR Code!",
          url: qrText,
        });
      } catch (error) {
        toast.error('Error while sharing!');
      }
    } else {
      toast.error('Sharing is not supported on this device/browser.');
    }
  };

  const handleFullscreen = () => {
    const qrImg = document.getElementById('qrImage');
    if (qrImg) {
      if (!document.fullscreenElement) {
        qrImg.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>Create QR Code</h2>
        <p className="text-sm text-gray-600">{currentDate}</p>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFullscreen}
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-300"
            title="Fullscreen"
          >
            <FaExpand size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-300"
            title="Copy QR Code"
          >
            <FaCopy size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-300"
            title="Share QR Code"
          >
            <FaShare size={20} />
          </motion.button>
        </div>

        <input
          type="text"
          placeholder="Enter extra note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-72 p-2 border border-gray-300 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateQRCode}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg mt-2 font-semibold transition-all duration-300"
        >
          Create QR Cart
        </motion.button>
        <button
         onClick={() => setIsModalOpen(true)}
         className="bg-blue-200 px-2 py-1 rounded-md hover:underline"
         >
          How can i?
         </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 border border-gray-300 rounded-lg mt-4 bg-white shadow-sm"
        >
          <QRCode id="qrImage" value={qrText} size={250} />
        </motion.div>

        <p className="text-sm text-gray-600 mt-2 text-center max-w-xs">{qrText}</p>
      </div>
      <div className="p-5">
      {/* Modal in Here! */}
      <Modal isOpen={isModalOpen}>
      <h2 className="flex text-xl font-bold items-center">
        Hello, {storedValue}!
        <MdClose
          className="ml-auto mt-1 cursor-pointer hover:bg-gray-300 rounded-md"
          onClick={() => setIsModalOpen(false)}
          size={24}
        />
      </h2>
        <div className="border-t-2 border-gray-300 my-4"></div>
        <p>1- Select your Orders.</p>
        <p>2- Add to card..</p>
        <p>3- Goto card.</p>
        <p>4- Add your Extra Note</p>
        <p>5- Sumbit, Click to Generate Button.</p>
      </Modal>
      </div>
      <Toaster />
    </>
  );
};

export default QRCodeComponent;