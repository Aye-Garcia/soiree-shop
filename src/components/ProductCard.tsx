import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import { useInventory } from "../context/InventoryContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isProductSold } = useInventory();
  const [isAdding, setIsAdding] = useState(false);

  const isSold = isProductSold(product.id);

  const handleAddToCart = async () => {
    if (isSold) return;

    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300 bg-gray-950">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
        />
      </Link>

      <div className="space-y-2">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg text-light hover:text-brand transition-colors font-display">
            {product.name}
          </h3>
        </Link>

        <p className="text-neutral-600 text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-brand text-light">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-300 font-sans ${
              isSold
                ? "bg-red-600 text-white border-red-600 cursor-not-allowed"
                : isAdding
                ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                : "bg-white text-black border-white hover:bg-black hover:text-white hover:border-white"
            }`}
            disabled={isSold || isAdding}
          >
            {isSold ? "Agotado" : isAdding ? "¡Agregado!" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
