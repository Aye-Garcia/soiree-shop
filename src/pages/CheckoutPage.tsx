import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Address, CartItem } from "../types";
import MercadoPagoCheckout from "../components/MercadoPagoCheckout";
import { formatPrice } from "../utils/formatPrice";

export default function CheckoutPage() {
  const { items, total, itemsCount } = useCart();
  const [shippingAddress, setShippingAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "AR", // Argentina por defecto para MercadoPago
  });
  const [billingAddress, setBillingAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "AR",
  });
  const [sameAsShipping] = useState(true);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleAddressChange = (field: keyof Address, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
    if (sameAsShipping) {
      setBillingAddress((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleCustomerInfoChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const isValid =
      customerInfo.firstName.trim() !== "" &&
      customerInfo.lastName.trim() !== "" &&
      customerInfo.email.trim() !== "" &&
      customerInfo.phone.trim() !== "" &&
      shippingAddress.street.trim() !== "" &&
      shippingAddress.city.trim() !== "" &&
      shippingAddress.state.trim() !== "" &&
      shippingAddress.zipCode.trim() !== "";

    setIsFormValid(isValid);
  };

  // Validar formulario cada vez que cambien los datos
  useEffect(() => {
    validateForm();
  }, [customerInfo, shippingAddress]);

  if (itemsCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
        <p className="text-gray-500">Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario de información */}
        <div className="space-y-6">
          {/* Información personal */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={customerInfo.firstName}
                  onChange={(e) =>
                    handleCustomerInfoChange("firstName", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand focus:border-transparent text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Apellido *
                </label>
                <input
                  type="text"
                  value={customerInfo.lastName}
                  onChange={(e) =>
                    handleCustomerInfoChange("lastName", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand focus:border-transparent text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) =>
                    handleCustomerInfoChange("email", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand focus:border-transparent text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    handleCustomerInfoChange("phone", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand focus:border-transparent text-black"
                  placeholder="+54 9 11 1234 5678"
                  required
                />
              </div>
            </div>
          </div>

          {/* Dirección de envío */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Dirección de Envío</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  value={shippingAddress.street}
                  onChange={(e) =>
                    handleAddressChange("street", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand focus:border-transparent text-black"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      handleAddressChange("city", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand focus:border-transparent text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Provincia *
                  </label>
                  <select
                    value={shippingAddress.state}
                    onChange={(e) =>
                      handleAddressChange("state", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand focus:border-transparent text-black"
                    required
                  >
                    <option value="">Seleccionar provincia</option>
                    <option value="CABA">CABA</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Catamarca">Catamarca</option>
                    <option value="Chaco">Chaco</option>
                    <option value="Chubut">Chubut</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Corrientes">Corrientes</option>
                    <option value="Entre Ríos">Entre Ríos</option>
                    <option value="Formosa">Formosa</option>
                    <option value="Jujuy">Jujuy</option>
                    <option value="La Pampa">La Pampa</option>
                    <option value="La Rioja">La Rioja</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="Misiones">Misiones</option>
                    <option value="Neuquén">Neuquén</option>
                    <option value="Río Negro">Río Negro</option>
                    <option value="Salta">Salta</option>
                    <option value="San Juan">San Juan</option>
                    <option value="San Luis">San Luis</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="Santiago del Estero">
                      Santiago del Estero
                    </option>
                    <option value="Tierra del Fuego">Tierra del Fuego</option>
                    <option value="Tucumán">Tucumán</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.zipCode}
                    onChange={(e) =>
                      handleAddressChange("zipCode", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand focus:border-transparent text-black"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen y pago */}
        <div className="space-y-6">
          {/* Resumen del pedido */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
            <div className="space-y-3 mb-6">
              {items.map((item: CartItem) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-contain bg-gray-900 rounded"
                      style={{ imageRendering: "crisp-edges" }}
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-gray-500">Cantidad: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="text-secondary-300">A coordinar</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Pago con MercadoPago */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>

            {!isFormValid ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <p className="text-yellow-800">
                  Completa todos los campos obligatorios (*) para habilitar el
                  pago
                </p>
              </div>
            ) : (
              <MercadoPagoCheckout
                orderData={{
                  shippingAddress: { ...shippingAddress, ...customerInfo },
                  billingAddress: sameAsShipping
                    ? { ...shippingAddress, ...customerInfo }
                    : { ...billingAddress, ...customerInfo },
                  paymentMethod: "mercadopago",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
