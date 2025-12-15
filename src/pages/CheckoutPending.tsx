import React from "react";
import { Link } from "react-router-dom";

const CheckoutPending: React.FC = () => {
  return (
    <div className="min-h-screen bg-bright-snow flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-dark-goldenrod rounded-full flex items-center justify-center mx-auto mb-4">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-carbon-black mb-2">
            Pago Pendiente
          </h1>
          <p className="text-gray-600">
            Tu pago está siendo procesado. Te notificaremos cuando se confirme.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800">
              <strong>¿Qué sigue?</strong>
              <br />
              • Recibirás un email cuando se confirme el pago
              <br />
              • Esto puede tomar hasta 48 horas
              <br />• Tu pedido se procesará una vez confirmado
            </p>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Número de referencia: #
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
              Ver Estado de Pedidos
            </Link>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          <p>¿Tienes preguntas? Contáctanos</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPending;
