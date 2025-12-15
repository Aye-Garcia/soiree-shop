import { useEffect } from "react";
import { useInventory } from "../context/InventoryContext";

/**
 * Hook que permite restock via URL parameters
 *
 * USO:
 * http://localhost:5173/?restock=all
 * http://localhost:5173/?restock=1,2,3
 * http://localhost:5173/?restock=clear
 */
export function useURLRestock() {
  const { restockProduct, soldProducts } = useInventory();

  useEffect(() => {
    // Solo en desarrollo
    if (typeof process !== 'undefined' && process.env.NODE_ENV !== "development") return;

    const urlParams = new URLSearchParams(window.location.search);
    const restockParam = urlParams.get("restock");

    if (!restockParam) return;

    switch (restockParam.toLowerCase()) {
      case "all":
        // Restockear todos
        Array.from(soldProducts).forEach((id) => restockProduct(id));
        console.log("🔄 Todos los productos restockeados via URL");
        break;

      case "clear":
        // Limpiar localStorage completamente
        localStorage.removeItem("soiree-sold-products");
        window.location.reload();
        break;

      default:
        // IDs específicos separados por coma
        const productIds = restockParam.split(",").map((id) => id.trim());
        productIds.forEach((id) => {
          if (soldProducts.has(id)) {
            restockProduct(id);
            console.log(`✅ Producto ${id} restockeado via URL`);
          }
        });
        break;
    }

    // Limpiar parámetro URL después de usar
    const newUrl = window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }, [restockProduct, soldProducts]);
}
