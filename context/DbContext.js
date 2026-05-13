import { createContext, useContext, useState } from 'react';

const DbContext = createContext(null);

export function DbProvider({ children }) {
  const [ changeEffect, setChangeEffect ] = useState(false)
  const markChanged = () => setChangeEffect(!changeEffect)
  return (
    <DbContext.Provider value={{ changeEffect, markChanged }}>
      {children}
    </DbContext.Provider>
  );
}

export function useDb() {
  const ctx = useContext(DbContext);
  if (!ctx) throw new Error('useDb doit etre utilise dans DbProvider');
  return ctx;
}
