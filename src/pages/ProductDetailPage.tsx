import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { useInventory } from "../context/InventoryContext";
import { formatPrice } from "../utils/formatPrice";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { isProductSold } = useInventory();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = products.find((p) => p.id === id);
  const isSold = product ? isProductSold(product.id) : false;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Producto no encontrado
        </h1>
        <Link
          to="/products"
          className="text-primary-600 hover:text-primary-700 mt-4 inline-block"
        >
          ← Volver a Productos
        </Link>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!product || isSold) return;

    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/products"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Volver a Productos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative max-h-96 overflow-auto rounded-lg bg-gray-900">
            <img
              src={
                product.images
                  ? product.images[selectedImageIndex]
                  : product.image
              }
              alt={`${product.name} - foto ${selectedImageIndex + 1}`}
              className={`w-full ${
                product.id === "1" &&
                (product.images
                  ? product.images[selectedImageIndex]
                  : product.image) === "/calvin.png"
                  ? "object-contain"
                  : "object-cover"
              } rounded-lg`}
              style={{ imageRendering: "crisp-edges" }}
            />

            {/* Navigation arrows for multiple images */}
            {product.images && product.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev === 0 ? product.images!.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                >
                  ←
                </button>
                <button
                  onClick={() =>
                    setSelectedImageIndex((prev) =>
                      prev === product.images!.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 top-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-gold"
                      : "border-gray-700 hover:border-gray-500"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} miniatura ${index + 1}`}
                    className={`w-full h-full ${
                      image === "/calvin.png"
                        ? "object-contain"
                        : "object-cover"
                    } bg-gray-900`}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Image counter */}
          {product.images && product.images.length > 1 && (
            <div className="text-center text-sm text-gray-400">
              Foto {selectedImageIndex + 1} de {product.images.length}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-2">{product.category}</p>
          </div>

          <p className="text-3xl font-bold text-primary-600">
            {formatPrice(product.price)}
          </p>

          <p className="text-white">{product.description}</p>

          {!isSold ? (
            <div>
              <p className="text-secondary-300 font-medium">✓ Disponible</p>
            </div>
          ) : (
            <div>
              <p className="text-red-700 font-medium">⚠ Agotado</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={isSold || isAdding}
              className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${
                isSold
                  ? "bg-red-600 text-white cursor-not-allowed"
                  : isAdding
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-600 text-white hover:bg-gray-800"
              }`}
            >
              {isSold
                ? "Agotado"
                : isAdding
                ? "¡Agregando al Carrito!"
                : "Agregar al Carrito"}
            </button>
            <p className="text-sm text-gray-400">
              {!isSold
                ? "Edición limitada - ¡Solo 1 disponible!"
                : "Artículo no disponible"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
