import { createContext, useContext, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const db = useSQLiteContext();
  const [user, setUser] = useState(null);

  const login = async (nom, mdp) => {
    const row = await db.getFirstAsync(
      'SELECT * FROM Client WHERE nom = ? AND mdp = ?',
      nom.trim(), mdp.trim()
    );
    if (row) {
      setUser({
        id: row.id,
        nom: row.nom,
        mdp: row.mdp,
        admin: row.admin == 1,
        adresse: row.adresse,
        langue: row.langue,
      });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const updateUser = async (updates) => {
    if (!user) return;
    const newMdp = updates.mdp ?? user.mdp;
    const newAdresse = updates.adresse ?? user.adresse;
    const newLangue = updates.langue ?? user.langue;
    await db.runAsync(
      'update client set mdp = ?, adresse = ?, langue = ? where id = ?',
      newMdp, newAdresse, newLangue, user.id
    );
    setUser({ ...user, ...updates });
  };

  const getI18n = (translations) => {
    const i18n = new I18n(translations);
    i18n.locale = user.langue == "auto" ? getLocales()[0].languageCode : user.langue;
    return i18n;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, getI18n }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit etre utilise dans AuthProvider');
  return ctx;
}
