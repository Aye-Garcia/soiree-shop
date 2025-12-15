import { useEffect } from "react";
import { useInventory } from "../context/InventoryContext";

/**
 * Hook para desarrollo que añade atajos de teclado para restock
 *
 * Atajos disponibles:
 * - Ctrl + Alt + R: Restockear todos los productos
 * - Ctrl + Alt + V: Ver productos vendidos en consola
 * - Ctrl + Alt + 1-9: Restockear producto específico por posición
 */
export function useRestockShortcuts() {
  const { restockProduct, soldProducts } = useInventory();

  useEffect(() => {
    // Solo en desarrollo
    if (process.env.NODE_ENV !== "development") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Debe presionar Ctrl + Alt
      if (!e.ctrlKey || !e.altKey) return;

      switch (e.key) {
        case "r":
        case "R":
          // Restockear todos
          Array.from(soldProducts).forEach((id) => restockProduct(id));
          console.log("🔄 Todos los productos restockeados");
          e.preventDefault();
          break;

        case "v":
        case "V":
          // Ver productos vendidos
          console.log("📦 Productos vendidos:", Array.from(soldProducts));
          e.preventDefault();
          break;

        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          // Restockear producto específico
          const productId = e.key;
          if (soldProducts.has(productId)) {
            restockProduct(productId);
            console.log(`✅ Producto ${productId} restockeado`);
          } else {
            console.log(`ℹ️ Producto ${productId} no está vendido`);
          }
          e.preventDefault();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Log de atajos disponibles
    console.log(`
⌨️ ATAJOS DE RESTOCK ACTIVOS
===========================
Ctrl + Alt + R : Restockear todos
Ctrl + Alt + V : Ver productos vendidos  
Ctrl + Alt + 1-9 : Restockear producto específico
    `);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [restockProduct, soldProducts]);
}
