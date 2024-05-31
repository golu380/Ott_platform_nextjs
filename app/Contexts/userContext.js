// context/UserContext.js

"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { validateUserAction } from '../actions';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

      validateUserAction().then(userData => {
        console.log(userData)
        setUser(userData);
        setLoading(false);
      });
   
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
