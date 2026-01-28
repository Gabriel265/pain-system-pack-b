// src/context/SkinContext.js
import { createContext, useContext, useState } from 'react';

const SkinContext = createContext();

export const SkinProvider = ({ children }) => {
  const [skin, setSkin] = useState('default'); // default to current behavior

  return (
    <SkinContext.Provider value={{ skin, setSkin }}>
      {children}
    </SkinContext.Provider>
  );
};

export const useSkin = () => useContext(SkinContext);
