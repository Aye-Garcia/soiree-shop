import React from "react";
import { useInventory } from "../context/InventoryContext";
import { useProducts } from "../hooks/useProducts";

export default function AdminPanel() {
  const { soldProducts, restockProduct } = useInventory();
  const { products } = useProducts();

  const soldProductsList = products.filter((product) =>
    soldProducts.has(product.id)
  );

  if (soldProductsList.length === 0) {
    return (
      <div className="p-4 bg-gray-900 text-white rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Panel de Administración</h3>
        <p className="text-gray-400">No hay productos agotados</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Panel de Administración</h3>
      <h4 className="text-md font-medium mb-2">Productos Agotados:</h4>
      <div className="space-y-2">
        {soldProductsList.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center bg-gray-800 p-2 rounded"
          >
            <span>{product.name}</span>
            <button
              onClick={() => restockProduct(product.id)}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
            >
              Restockear
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
