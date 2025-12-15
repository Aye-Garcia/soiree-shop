# Configuración de MercadoPago para Soirée

## 📋 Pasos para Configurar MercadoPago

### 1. Crear Cuenta de Desarrollador

1. Ve a [MercadoPago Developers](https://www.mercadopago.com.ar/developers)
2. Crea una cuenta o inicia sesión
3. Ve a "Mis aplicaciones" y crea una nueva aplicación

### 2. Obtener Credenciales

1. En tu aplicación, ve a "Credenciales"
2. Copia tu **Public Key** de prueba (comienza con `TEST-`)
3. Copia tu **Access Token** de prueba

### 3. Configurar Variables de Entorno

1. Copia el archivo `.env.example` como `.env`:
   ```bash
   cp .env.example .env
   ```
2. Abre el archivo `.env` en tu editor
3. Reemplaza `TEST-12345678-1234-1234-1234-123456789012` con tu Public Key real
4. Guarda el archivo
5. Reinicia el servidor de desarrollo (`npm run dev`)

**Importante:** El archivo `.env` ya está en `.gitignore` para proteger tus credenciales.

### 4. Configurar el Backend (Requerido)

Necesitas crear un backend para manejar las preferencias de pago:

```javascript
// Ejemplo con Node.js/Express
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: "TU_ACCESS_TOKEN_DE_PRUEBA",
});

app.post("/api/mercadopago/create-preference", async (req, res) => {
  try {
    const preference = {
      items: req.body.items,
      payer: req.body.payer,
      back_urls: req.body.back_urls,
      auto_return: "approved",
      payment_methods: req.body.payment_methods,
      shipments: req.body.shipments,
      statement_descriptor: req.body.statement_descriptor,
      external_reference: req.body.external_reference,
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la preferencia" });
  }
});
```

### 5. Webhooks (Opcional pero Recomendado)

Configure webhooks para recibir notificaciones de pago:

```javascript
app.post("/api/mercadopago/webhook", (req, res) => {
  const { type, data } = req.body;

  if (type === "payment") {
    // Procesar notificación de pago
    console.log("Pago recibido:", data.id);
    // Actualizar base de datos, enviar email, etc.
  }

  res.status(200).send("OK");
});
```

## 🧪 Modo de Prueba

### Tarjetas de Prueba (Argentina)

- **Visa aprobada**: 4509 9535 6623 3704
- **Mastercard aprobada**: 5031 7557 3453 0604
- **Visa rechazada**: 4000 0000 0000 0002

### Datos de Prueba

- **CVV**: Cualquier número de 3 dígitos
- **Fecha**: Cualquier fecha futura
- **Titular**: APRO (aprobada) o OTHE (rechazada)

## 🚀 Pasar a Producción

1. En MercadoPago Developers, ve a "Credenciales"
2. Cambia a "Credenciales de producción"
3. Actualiza el Public Key y Access Token en tu código
4. Configura tu dominio en "Configuración" > "Webhooks"
5. Prueba todo el flujo de pago

## 🔧 Características Implementadas

✅ **Checkout integrado** con formulario completo
✅ **Validación de formulario** antes de habilitar pago
✅ **Páginas de resultado** (éxito, error, pendiente)
✅ **Manejo de direcciones** argentinas
✅ **Integración con carrito** de compras
✅ **Vaciado automático del carrito** después del pago exitoso
✅ **Información del pedido** en páginas de resultado

## 📱 Métodos de Pago Soportados

- 💳 Tarjetas de crédito (Visa, Mastercard, American Express)
- 💳 Tarjetas de débito
- 🏦 Transferencias bancarias
- 💰 Efectivo (Rapipago, Pago Fácil)
- 📱 Billeteras digitales

## 🛡️ Seguridad

- ✅ Todos los datos sensibles se procesan en servidores de MercadoPago
- ✅ Certificación PCI DSS
- ✅ Tokens seguros para las transacciones
- ✅ No se almacenan datos de tarjetas en tu servidor

## 📞 Soporte

Si necesitas ayuda:

- [Documentación oficial de MercadoPago](https://www.mercadopago.com.ar/developers/es/docs)
- [SDK React de MercadoPago](https://github.com/mercadopago/sdk-react)
- [Centro de ayuda para desarrolladores](https://www.mercadopago.com.ar/ayuda)
