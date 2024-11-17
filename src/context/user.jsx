import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../config/firebase'; // Make sure to import the correct Firebase config
import { collection, query, where, getDocs } from 'firebase/firestore';

// Create the context
const UserContext = createContext();

// Custom hook to use UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component that will wrap your app and provide the context
export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);

  // Fetch userEmail and userName when the component mounts (on auth state change)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = auth.currentUser?.uid; // Get current user's UID
        if (userId) {
          const colRef = collection(db, 'USERS');
          const q = query(colRef, where('authId', '==', userId));

          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              setUserEmail(userData.email || 'No Email'); // Set the email value
              setUserName(userData.name || 'No Name'); // Set the name value
            });
          } else {
            console.error('No user data found!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []); // Run once when the component mounts

  return (
    <UserContext.Provider value={{ userEmail, userName }}>
      {children}
    </UserContext.Provider>
  );
};
