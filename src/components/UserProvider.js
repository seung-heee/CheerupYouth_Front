import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (token, user) => {
    const name = user.name
    const id = user.id

    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('id', id);
    setUser({ token, id, name});
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('id');
    setUser(null);
  };
  
  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const name = await AsyncStorage.getItem('name');
      const id = await AsyncStorage.getItem('id');
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
