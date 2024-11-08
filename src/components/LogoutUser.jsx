import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import Logout from '../assets/LogoutS';

function LogoutUser() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <ul className="flex flex-row gap-2">
        <li className="flex-center cursor-pointer p-16-semibold whitespace-nowrap">
          <button
            onClick={handleLogout}
            className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-full bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
          >
            <Logout />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default LogoutUser;
