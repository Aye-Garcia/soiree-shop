import React from "react";
import { Link } from "react-router-dom";

const CheckoutFailure: React.FC = () => {
  return (
    <div className="min-h-screen bg-bright-snow flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-carbon-black mb-2">
            Pago Cancelado
          </h1>
          <p className="text-gray-600">
            El pago no pudo procesarse. No te preocupes, no se realizó ningún
            cargo.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 mb-4">
            Puedes intentar nuevamente o elegir otro método de pago.
          </p>

          <div className="space-y-3">
            <Link
              to="/checkout"
              className="block w-full bg-palm-leaf text-white py-3 px-6 rounded-lg font-semibold hover:bg-stormy-teal transition-colors"
            >
              Intentar Nuevamente
            </Link>

            <Link
              to="/cart"
              className="block w-full border border-palm-leaf text-palm-leaf py-3 px-6 rounded-lg font-semibold hover:bg-palm-leaf hover:text-white transition-colors"
            >
              Ver Carrito
            </Link>

            <Link
              to="/"
              className="block w-full text-gray-500 py-2 px-6 hover:text-carbon-black transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          <p>¿Necesitas ayuda? Contáctanos</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFailure;
