import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useCart } from "../context/CartContext";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Obtener detalles del pago de los parámetros de URL
    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");
    const externalReference = searchParams.get("external_reference");

    if (status === "approved") {
      // Limpiar el carrito después de un pago exitoso
      clearCart();

      // Guardar detalles del pedido
      setOrderDetails({
        paymentId,
        status,
        externalReference,
        date: new Date().toLocaleDateString("es-AR"),
      });
    }
  }, [searchParams, clearCart]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          ¡Pago Exitoso!
        </h1>
        <p className="text-green-700 mb-6">
          Tu pedido ha sido confirmado y está siendo procesado.
        </p>

        {orderDetails && (
          <div className="bg-white rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-3 text-gray-800">
              Detalles del Pedido:
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>ID de Pago:</strong> {orderDetails.paymentId}
              </p>
              <p>
                <strong>Referencia:</strong> {orderDetails.externalReference}
              </p>
              <p>
                <strong>Fecha:</strong> {orderDetails.date}
              </p>
              <p>
                <strong>Estado:</strong> Aprobado
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-gray-600">
            Recibirás un email con los detalles de tu compra y el seguimiento
            del envío.
          </p>

          <div className="space-x-4">
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
        <p>¿Tienes alguna pregunta sobre tu pedido?</p>
        <p>
          Contáctanos en{" "}
          <a
            href="mailto:vestidos.soiree@gmail.com"
            className="text-brand hover:underline"
          >
            vestidos.soiree@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
