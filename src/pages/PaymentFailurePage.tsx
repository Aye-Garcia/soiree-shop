import { Link, useSearchParams } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function PaymentFailurePage() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8">
        <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-red-800 mb-4">
          Error en el Pago
        </h1>
        <p className="text-red-700 mb-6">
          No pudimos procesar tu pago. No se realizó ningún cargo.
        </p>

        <div className="bg-white rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold mb-3 text-gray-800">
            Detalles del Error:
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            {paymentId && (
              <p>
                <strong>ID de Pago:</strong> {paymentId}
              </p>
            )}
            <p>
              <strong>Estado:</strong> {status || "Rechazado"}
            </p>
            <p>
              <strong>Fecha:</strong> {new Date().toLocaleDateString("es-AR")}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">Posibles causas:</p>
          <ul className="text-sm text-gray-600 text-left list-disc list-inside space-y-1">
            <li>Fondos insuficientes en la tarjeta</li>
            <li>Datos de la tarjeta incorrectos</li>
            <li>La tarjeta está vencida</li>
            <li>El banco rechazó la transacción</li>
          </ul>

          <div className="space-x-4 mt-6">
            <Link to="/checkout" className="btn-primary">
              Intentar Nuevamente
            </Link>
            <Link
              to="/cart"
              className="btn-secondary bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Volver al Carrito
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p>¿Sigues teniendo problemas?</p>
        <p>
          Contáctanos en{" "}
          <a
            href="mailto:vestidos.soiree@gmail.com"
            className="text-brand hover:underline"
          >
            vestidos.soiree@gmail.com
          </a>{" "}
          o por{" "}
          <a
            href="https://wa.me/5491166590708"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
