import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const ajouterAuPanier = (produit) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.produit.id === produit.id);
      if (existing) {
        return prev.map((i) =>
          i.produit.id === produit.id ? { ...i, quantite: i.quantite + 1 } : i
        );
      }
      return [...prev, { produit, quantite: 1 }];
    });
  };

  const retirerDuPanier = (produitId) => {
    setItems((prev) => prev.filter((i) => i.produit.id !== produitId));
  };

  const modifierQuantite = (produitId, delta) => {
    setItems((prev) =>
      prev
        .map((i) => i.produit.id === produitId ? { ...i, quantite: i.quantite + delta } : i)
        .filter((i) => i.quantite > 0)
    );
  };

  const viderPanier = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantite, 0);
  const totalPrix = items.reduce((sum, i) => sum + i.produit.prix * i.quantite, 0);

  return (
    <CartContext.Provider value={{ items, ajouterAuPanier, retirerDuPanier, modifierQuantite, viderPanier, totalItems, totalPrix }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit etre utilise dans CartProvider');
  return ctx;
}
