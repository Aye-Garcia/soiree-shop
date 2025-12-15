import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CheckoutSuccess: React.FC = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    // Limpiar el carrito después del pago exitoso
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-bright-snow flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-palm-leaf rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-carbon-black mb-2">
            ¡Pago Exitoso!
          </h1>
          <p className="text-gray-600">
            Tu compra se ha procesado correctamente. Recibirás un email con los
            detalles de tu pedido.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 mb-4">
            Número de orden: #
            {new URLSearchParams(window.location.search).get(
              "external_reference"
            ) || "N/A"}
          </p>

          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full bg-palm-leaf text-white py-3 px-6 rounded-lg font-semibold hover:bg-stormy-teal transition-colors"
            >
              Continuar Comprando
            </Link>

            <Link
              to="/orders"
              className="block w-full border border-palm-leaf text-palm-leaf py-3 px-6 rounded-lg font-semibold hover:bg-palm-leaf hover:text-white transition-colors"
            >
              Ver Mis Pedidos
            </Link>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          <p>Gracias por elegir Soirée</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
