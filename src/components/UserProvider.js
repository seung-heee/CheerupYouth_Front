import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDataP, setUserDataP] = useState(null);

  const login = async () => {
    const userData = await AsyncStorage.getItem("userData");

    if (userData) {
      const userParse = JSON.parse(userData);

      setUserDataP(userParse);

      console.log(userParse);
    }
  };
  useEffect(() => {
    login();
  }, []);

  return (
    <UserContext.Provider value={{ userDataP, setUserDataP }}>
      {children}
    </UserContext.Provider>
  );
};
