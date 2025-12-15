import React, { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import { useProducts } from "../hooks/useProducts";

/**
 * Overlay flotante para desarrollo - solo aparece en development
 * Se puede ocultar/mostrar con Ctrl + Alt + D
 */
export default function DevRestockOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const { soldProducts, restockProduct } = useInventory();
  const { products } = useProducts();

  // Solo en desarrollo
  if (process.env.NODE_ENV !== "development") return null;

  // Escuchar Ctrl + Alt + D para toggle
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === "d") {
        setIsVisible((prev) => !prev);
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-lg text-xs opacity-50 hover:opacity-100 transition-opacity">
        Press Ctrl+Alt+D for restock tools
      </div>
    );
  }

  const soldProductsList = products.filter((p) => soldProducts.has(p.id));

  return (
    <div className="fixed top-20 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg border border-gray-700 max-w-xs z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-sm">🔧 Restock Tools</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => {
            Array.from(soldProducts).forEach((id) => restockProduct(id));
          }}
          className="w-full bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs"
          disabled={soldProducts.size === 0}
        >
          Restock All ({soldProducts.size})
        </button>

        {soldProductsList.length > 0 && (
          <div className="max-h-32 overflow-y-auto space-y-1">
            <div className="text-xs text-gray-400 mb-1">Sold Products:</div>
            {soldProductsList.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center text-xs"
              >
                <span className="truncate flex-1 mr-2">{product.name}</span>
                <button
                  onClick={() => {
                    restockProduct(product.id);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-2 py-0.5 rounded text-xs"
                >
                  Restock
                </button>
              </div>
            ))}
          </div>
        )}

        {soldProducts.size === 0 && (
          <div className="text-xs text-gray-400 text-center py-2">
            No sold products
          </div>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-gray-700 text-xs text-gray-400">
        Shortcuts: Ctrl+Alt+R (all), Ctrl+Alt+V (view)
      </div>
    </div>
  );
}
