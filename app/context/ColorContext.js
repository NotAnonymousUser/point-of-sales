"use client"

import { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

export const useColor = () => useContext(ColorContext);

export const ColorProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState('#346939');
  const [secondaryColor, setSecondaryColor] = useState('#F6F8F9');

  return (
    <ColorContext.Provider value={{ primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor, }}>
      {children}
    </ColorContext.Provider>
  );
};
