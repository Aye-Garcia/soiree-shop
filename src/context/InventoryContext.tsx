import React, { createContext, useContext, useState, useEffect } from "react";

interface InventoryContextValue {
  soldProducts: Set<string>;
  markProductAsSold: (productId: string) => void;
  restockProduct: (productId: string) => void;
  isProductSold: (productId: string) => boolean;
  isProductAvailable: (productId: string) => boolean;
  isInitialized: boolean;
}

const InventoryContext = createContext<InventoryContextValue | undefined>(
  undefined
);

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [soldProducts, setSoldProducts] = useState<Set<string>>(() => {
    // Inicialización sincrónica desde localStorage
    try {
      const savedSoldProducts = localStorage.getItem("soiree-sold-products");
      if (savedSoldProducts) {
        const parsedProducts = JSON.parse(savedSoldProducts);
        return new Set(parsedProducts);
      }
    } catch (error) {
      console.error("❌ Error in initial load:", error);
    }
    return new Set();
  });

  const [isInitialized] = useState(true); // Marcar como inicializado inmediatamente

  // Guardar productos vendidos en localStorage cuando cambien
  useEffect(() => {
    const soldProductsArray = [...soldProducts];
    localStorage.setItem(
      "soiree-sold-products",
      JSON.stringify(soldProductsArray)
    );
  }, [soldProducts]);

  const markProductAsSold = (productId: string) => {
    setSoldProducts((prev) => {
      const newSet = new Set(prev);
      newSet.add(productId);
      return newSet;
    });
  };

  const restockProduct = (productId: string) => {
    setSoldProducts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  };

  const isProductSold = (productId: string) => {
    return soldProducts.has(productId);
  };

  const isProductAvailable = (productId: string) => {
    return !soldProducts.has(productId);
  };

  const value = {
    soldProducts,
    markProductAsSold,
    restockProduct,
    isProductSold,
    isProductAvailable,
    isInitialized,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
}
