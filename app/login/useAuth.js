// useAuth.js
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Assuming you're using React Router for routing
import { validateUserAction } from '../actions';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    // Your logic to check if the user is logged in
    const loggedIn = validateUserAction()
    if (loggedIn.success == true) {
      setIsLoggedIn(true);
      // Redirect the user to the dashboard or another page
     
    }
  }, [history]);

  return isLoggedIn;
};

export default useAuth;
