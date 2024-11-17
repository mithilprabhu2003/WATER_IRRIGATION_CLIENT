import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  // Define the routes with conditional navigation based on authentication status
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated === null ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        <Home />
      ) : (
        <Navigate to="/login" replace />
      ),
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" replace /> : <Login />,
    },
    {
      path: "/register",
      element: isAuthenticated ? <Navigate to="/" replace /> : <Register />,
    },
    {
      path: "*",
      element: <h1>NO PAGE FOUND</h1>,
    },
  ]);

  return (
      <RouterProvider router={router} />
  )
};

export default App;
