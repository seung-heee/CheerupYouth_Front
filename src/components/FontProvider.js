// src/components/FontProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import * as Font from "expo-font";
import { ActivityIndicator, View } from "react-native";

const FontContext = createContext();

export const useFont = () => useContext(FontContext);

const FontProvider = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        M: require("../../assets/fonts/AppleSDGothicNeoM.ttf"),
        B: require("../../assets/fonts/AppleSDGothicNeoB.ttf"),
        SB: require("../../assets/fonts/AppleSDGothicNeoSB.ttf"),
        R: require("../../assets/fonts/AppleSDGothicNeoR.ttf"),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FontContext.Provider value={fontLoaded}>{children}</FontContext.Provider>
  );
};

export default FontProvider;
