import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useInventory } from "../context/InventoryContext";
import { CartItem } from "../types";

interface MercadoPagoCheckoutProps {
  orderData: {
    shippingAddress: any;
    billingAddress: any;
    paymentMethod: string;
  };
}

export default function MercadoPagoCheckout({
  orderData,
}: MercadoPagoCheckoutProps) {
  const { items, total, clearCart } = useCart();
  const { markProductAsSold } = useInventory();
  const [orderSent, setOrderSent] = useState(false);

  // Número de WhatsApp desde variables de entorno
  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

  const generateOrderSummary = () => {
    const orderItems = items
      .map(
        (item: CartItem) =>
          `• ${item.product.name} - $${item.product.price.toFixed(2)}`
      )
      .join("\n");

    const shippingInfo = `
*Dirección de Envío:*
${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}
${orderData.shippingAddress.street}
${orderData.shippingAddress.city}, ${orderData.shippingAddress.state}
CP: ${orderData.shippingAddress.zipCode}
Tel: ${orderData.shippingAddress.phone}`;

    return `*Nueva Orden - Soirée Boutique*

*Productos:*
${orderItems}

*Total: $${total.toFixed(2)}*
${shippingInfo}

Hola! Me interesa completar esta compra. ¿Podrías enviarme el link de pago?`;
  };

  const handleWhatsAppRedirect = () => {
    if (!WHATSAPP_NUMBER) {
      alert(
        "Error: Número de WhatsApp no configurado. Contacta al administrador."
      );
      return;
    }

    // Marcar todos los productos como vendidos
    items.forEach((item) => {
      markProductAsSold(item.product.id);
    });

    // Esperar un momento para asegurar la persistencia
    setTimeout(() => {
      const message = generateOrderSummary();
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      setOrderSent(true);
      window.open(whatsappUrl, "_blank");

      // Limpiar carrito después de marcar como vendidos
      setTimeout(() => {
        clearCart();
      }, 2000);
    }, 100); // Small delay to ensure state update
  };

  // Verificar si WhatsApp está configurado
  if (!WHATSAPP_NUMBER) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-yellow-800 font-semibold mb-2">
          Configuración de WhatsApp Requerida
        </h3>
        <p className="text-yellow-700 text-sm">
          Para habilitar las compras por WhatsApp, debes:
        </p>
        <ol className="text-yellow-700 text-sm mt-2 ml-4 list-decimal">
          <li>Agregar VITE_WHATSAPP_NUMBER en el archivo .env</li>
          <li>Usar el formato internacional (ej: 5491123456789)</li>
          <li>Reiniciar el servidor de desarrollo</li>
        </ol>
        <p className="text-yellow-600 text-xs mt-2">
          Formato: [código país][código área][número] sin + ni espacios
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4 text-black">
        <h3 className="font-semibold mb-2">Resumen del Pedido</h3>
        <div className="space-y-2 text-sm">
          {items.map((item: CartItem) => (
            <div key={item.product.id} className="flex justify-between">
              <span>
                {item.product.name} x{item.quantity}
              </span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {!orderSent ? (
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">
              Compra por WhatsApp
            </h4>
            <p className="text-sm text-green-700">
              Te redirigiremos a WhatsApp donde podrás finalizar tu compra de
              forma personalizada.
            </p>
          </div>

          <button
            onClick={handleWhatsAppRedirect}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.107" />
            </svg>
            <span>Completar Compra por WhatsApp</span>
          </button>

          <div className="text-xs text-gray-500 text-center">
            <p>Pago seguro y personalizado</p>
            <p>Atención directa para una experiencia exclusiva</p>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-center">
            <div className="text-green-600 text-2xl mb-2">✓</div>
            <h4 className="font-medium text-green-800 mb-2">¡Orden Enviada!</h4>
            <p className="text-sm text-green-700">
              Te hemos redirigido a WhatsApp con toda la información de tu
              pedido. En breve recibirás el link de pago.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
