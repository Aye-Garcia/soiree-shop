import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types";

export default function CartPage() {
  const { items, removeFromCart, total, itemsCount } = useCart();

  if (itemsCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
        <div className="bg-gray-50 rounded-lg p-8">
          <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
          <Link to="/products" className="btn-primary">
            Comenzar a Comprar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item: CartItem) => (
              <div
                key={item.product.id}
                className="card flex items-center space-x-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-20 w-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-secondary-300 font-medium">
                    Edición Limitada - 1 unidad
                  </p>
                </div>

                <div className="text-right flex items-center space-x-4">
                  <div>
                    <p className="font-semibold">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    title="Eliminar del carrito"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>
                  Subtotal ({itemsCount}{" "}
                  {itemsCount === 1 ? "artículo" : "artículos"})
                </span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>A coordinar</span>
              </div>
              <div>
                <p className="text-secondary-100 text-sm">
                  ✨ Productos de edición limitada - Solo 1 unidad disponible
                  por artículo
                </p>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full btn-primary mt-6 text-center block bg-gray-100 hover:bg-gray-500"
            >
              Proceder al Pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
