import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Toaster, toast } from 'react-hot-toast';
import { GoVerified } from 'react-icons/go';
import { config } from '../configs/config';
import { Helmet } from 'react-helmet';
import { authVerifieds } from '../configs/System';

const Auth: React.FC = () => {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [msgerror, setMsgerror] = useState<string>('');
  const [nameValue, setNameValue] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  // const [storedValue] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  useEffect(() => {
    const savedValue = localStorage.getItem('username');
    if (savedValue) {
      window.location.href = '/verified';
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (captchaValue) {
      console.log('reCaptcha Verified.');
      authVerifieds();
    } else {
      toast.error('Please verify reCaptcha');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberChr = /[123456789]/g;
    const turkishCharacters = /[ğ<>€#=î_\/$@ß♥Ğ₺`ÖüÜé\[\]'.^+!%&/(;:),*{?}]/;
    if (numberChr.test(value) || turkishCharacters.test(value)) {
      event.preventDefault();
      setMsgerror('Please use EU Characters..');
    } else {
      setNameValue(value);
      setMsgerror('');
    }
  };

  const saveUsername = () => {
    if (username) {
      localStorage.setItem('username', username);
      console.log(`Welcome, ${username}`);
    } else {
      alert('Please enter a username.');
    }
  };

  const saveGender = (selectedGender: string) => {
    setGender(selectedGender);
    localStorage.setItem('gender', selectedGender);
  };

  return (
    <>
      <Helmet>
        <title>{config.resturant} | Auth</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center py-10 bg-gradient-to-r from-blue-200 to-pink-200">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            <GoVerified className="inline text-blue-500" /> Authentication
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                Your Name & Surname:
              </label>
              <div style={{fontFamily:'Roboto Condensed, serif'}} className="flex space-x-4 mb-2">
                <button
                  type="button"
                  className={`px-6 py-2 rounded-full text-white transition-all ${
                    gender === 'Male' ? 'bg-blue-500' : 'bg-gray-400 hover:bg-blue-300'
                  }`}
                  onClick={() => saveGender('Male')}
                >
                  Male
                </button>
                <button
                  type="button"
                  className={`px-6 py-2 rounded-full text-white transition-all ${
                    gender === 'Female' ? 'bg-pink-500' : 'bg-pink-200 hover:bg-pink-300'
                  }`}
                  onClick={() => saveGender('Female')}
                >
                  Female
                </button>
                <button
                  type="button"
                  className={`px-6 py-2 rounded-full text-white transition-all ${
                    gender === 'Other' ? 'bg-green-500' : 'bg-green-200 hover:bg-green-300'
                  }`}
                  onClick={() => saveGender('Other')}
                >
                  Other
                </button>
              </div>
              <input
                type="text"
                id="name"
                required
                value={nameValue}
                onChange={(e) => {
                  setUsername(e.target.value);
                  handleChange(e);
                }}
                placeholder="John Doe & Jane Doe"
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {msgerror && <p className="text-red-500 text-sm mt-2">{msgerror}</p>}
            </div>
            <div className="mb-6">
              <ReCAPTCHA
                sitekey={config.captchaPrivateKey}
                onChange={handleCaptchaChange}
              />
            </div>
            <button
              type="submit"
              onClick={saveUsername}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Verify
            </button>
          </form>
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default Auth;