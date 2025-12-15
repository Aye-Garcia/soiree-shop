import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "../types";
import { useInventory } from "./InventoryContext";

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemsCount: number;
  isProductInCart: (productId: string) => boolean;
  isProductAvailable: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { isProductAvailable: isInInventory, isInitialized } = useInventory();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("soiree-cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("soiree-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product) => {
    // Verificar si el producto está disponible en inventario
    if (!isInInventory(product.id)) {
      return;
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      // Para el sistema de stock único, no permitir agregar si ya está en el carrito
      if (existingItem) {
        return currentItems;
      }

      const newItems = [...currentItems, { product, quantity: 1 }];
      return newItems;
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    // En el sistema de stock único, solo permitir cantidad 1 o remover (0)
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }

    // Mantener cantidad en 1 para el sistema de stock único
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: 1 } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isProductInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  const isProductAvailable = (productId: string) => {
    // Esperar a que el inventory esté inicializado
    if (!isInitialized) {
      return true; // Temporalmente disponible hasta que inventory se inicialice
    }

    // Un producto está disponible si:
    // 1. Está disponible en inventario (no vendido)
    // 2. Y no está actualmente en el carrito
    return isInInventory(productId) && !isProductInCart(productId);
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const itemsCount = items.reduce((count, item) => count + item.quantity, 0);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemsCount,
    isProductInCart,
    isProductAvailable,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
