import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const StatusModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckStatus = async () => {
    setError(null);
    setStatus(null);

    try {
      const userDoc = await getDoc(doc(db, 'USERS', email));
      if (userDoc.exists()) {
        setStatus(userDoc.data().status);
      } else {
        setError('User not found.');
      }
    } catch (err) {
      setError(`Error fetching status: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-900">Check User Status</h2>
            <p className="mt-2 text-gray-500">Enter your email to check the status</p>
          </div>
          <div className="mt-5">
            {error && <p className="text-center text-red-500">{error}</p>}
            {status && <p className="text-center text-green-500">Status: {status}</p>}
            <div className="relative mt-6">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder-transparent focus:border-gray-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
              <label
                htmlFor="email"
                className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-800"
              >
                Email Address
              </label>
            </div>
            <div className="my-6">
              <button
                onClick={handleCheckStatus}
                className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
              >
                Check Status
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-full rounded-md bg-gray-300 px-3 py-4 text-black focus:bg-gray-400 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
