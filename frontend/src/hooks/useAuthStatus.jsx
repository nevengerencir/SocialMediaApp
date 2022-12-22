// I am taking the user from the redux state.auth and every time the user state changes, I check if the user is there if it is my setLoggedIn changes and checkingStatus also changes, this hook gives returns these 2 values as an object
// Then we want to create a private route that will "outlet" the real route in app.js check if these 2 objects exist, if they do they  return the <Outlet/> other wise they <Navigate to 'desiredroute'

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user]);
  return {
    loggedIn,
    checkingStatus,
  };
};
