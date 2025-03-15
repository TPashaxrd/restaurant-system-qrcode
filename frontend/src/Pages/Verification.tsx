import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './main/Header';
import Footer from './main/Footer';
import Products from './main/Products';
import { GoBack } from '../configs/System';

const Joined: React.FC = () => {
    const isVerified: boolean = localStorage.getItem("verified") === 'true'; //Checking to LocalStorage for Verification

    const [storedValue, setStoredValue] = useState<string | null>(null);
    // When member enter the /verified page.
    useEffect(() => {
        if (isVerified) {
            // toast.success("Successfull Verification", {
            //     style: {
            //         border: "1px solid #4CAF50",
            //         padding: "10px",
            //         color: "#4CAF50",
            //         fontFamily: 'Space Grotesk, serif'
            //     }
            // });
            console.log("Succesfull Verification");
            
        } else {
            toast.error("Not Verified", {
                style: {
                    border: "1px solid red",
                    padding: '10px',
                    color: 'red'
                }
            })
        }
    }, [isVerified]);
    useEffect(() => {
      if (storedValue) {
        toast(`Welcome, ${storedValue}`, {
          position: 'bottom-left',
          duration: 5000,
          style: {
            border: '1px solid #4CAF50',
            padding: '10px',
            width: '330px',
            height: '35px',
            color: '#',
            fontFamily: 'Roboto Condensed, serif'
          }
        });
      }
    }, [storedValue]);     
    useEffect(() => {
      const savedValue = localStorage.getItem('username');
      if (savedValue) {
        setStoredValue(savedValue);
      }
    })
  return (
   <>
    {isVerified ? (
      <>
      <Header/>
      <Products/>
      <Footer/>
      </>
    ) : (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg border-2 border-gray-300">
          <p className="text-gray-700 mb-4">No verification has been done.</p>
          <button
            onClick={GoBack}
            className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    )}
   <Toaster />
   </>
  )
}

export default Joined;