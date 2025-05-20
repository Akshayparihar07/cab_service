// hooks/useCustomFonts.js
import * as Font from "expo-font";
import { useEffect, useState } from "react";

export const useCustomFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState(null);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Oswald": require("../assets/fonts/Oswald-VariableFont_wght.ttf"),
          // Add more font weights if using static fonts
          // "Oswald-Regular": require("../assets/fonts/Oswald-Regular.ttf"),
          // "Oswald-Light": require("../assets/fonts/Oswald-Light.ttf"),
          // "Oswald-Bold": require("../assets/fonts/Oswald-Bold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        setFontError(error);
        console.error("Font loading error:", error);
      }
    };

    loadFonts();
  }, []);

  return { fontsLoaded, fontError };
};