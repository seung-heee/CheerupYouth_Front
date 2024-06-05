import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (token, name) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('name', name);
    setUser({ token, name });
    console.log(user, 'provider')
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('name');
    setUser(null);
  };
  
  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const name = await AsyncStorage.getItem('name');
      if (token && name) {
        setUser({ token, name });
      }
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
