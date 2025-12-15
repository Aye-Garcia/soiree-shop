import { Link, useSearchParams } from "react-router-dom";
import { ClockIcon } from "@heroicons/react/24/solid";

export default function PaymentPendingPage() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const externalReference = searchParams.get("external_reference");

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
        <ClockIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-yellow-800 mb-4">
          Pago Pendiente
        </h1>
        <p className="text-yellow-700 mb-6">
          Tu pago está siendo procesado. Te notificaremos cuando sea confirmado.
        </p>

        <div className="bg-white rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold mb-3 text-gray-800">
            Detalles del Pago:
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            {paymentId && (
              <p>
                <strong>ID de Pago:</strong> {paymentId}
              </p>
            )}
            {externalReference && (
              <p>
                <strong>Referencia:</strong> {externalReference}
              </p>
            )}
            <p>
              <strong>Estado:</strong> Pendiente de confirmación
            </p>
            <p>
              <strong>Fecha:</strong> {new Date().toLocaleDateString("es-AR")}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Motivos comunes para pagos pendientes:
          </p>
          <ul className="text-sm text-gray-600 text-left list-disc list-inside space-y-1">
            <li>Pago con transferencia bancaria (demora 1-2 días hábiles)</li>
            <li>Verificación adicional del banco</li>
            <li>Pago en efectivo en puntos de pago</li>
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-blue-800 text-sm">
              <strong>📧 Te enviaremos un email</strong> cuando el pago sea
              confirmado. Mientras tanto, tu pedido queda reservado por 48
              horas.
            </p>
          </div>

          <div className="space-x-4 mt-6">
            <Link to="/products" className="btn-primary">
              Seguir Comprando
            </Link>
            <Link
              to="/"
              className="btn-secondary bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Ir al Inicio
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p>¿Tienes preguntas sobre tu pago?</p>
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
