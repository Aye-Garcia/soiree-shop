# 🚀 Solución Rápida: Backend para Preferencias de MercadoPago

## 📋 Paso 1: Obtener Access Token

1. Ve a [MercadoPago Developers](https://www.mercadopago.com.ar/developers)
2. Entra a tu aplicación
3. Ve a **"Credenciales"**
4. Copia tu **Access Token** (empieza con `APP_USR-` o `TEST-`)

⚠️ **IMPORTANTE**: Necesitas el **Access Token**, NO el Public Key

## 🔧 Paso 2: Backend Súper Rápido (5 minutos)

### Crear carpeta para backend:

```bash
mkdir soiree-backend
cd soiree-backend
```

### Instalar dependencias:

```bash
npm init -y
npm install express mercadopago cors dotenv
```

### Crear server.js:

```javascript
const express = require('express');
const { MercadoPagoConfig, Preference } = require('mercadopago');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5174'
}));
app.use(express.json());

// Configurar MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

// Crear preferencia
app.post('/api/mercadopago/create-preference', async (req, res) => {
  try {
    const preference = new Preference(client);

    const body = {
      items: req.body.items.map(item => ({
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: 'ARS',
      })),
      back_urls: {
        success: req.body.back_urls.success,
        failure: req.body.back_urls.failure,
        pending: req.body.back_urls.pending,
      },
      auto_return: 'approved',
      external_reference: req.body.external_reference,
      statement_descriptor: 'SOIREE VESTIDOS',
    };

    const response = await preference.create({ body });

    res.json({
      id: response.id,
      init_point: response.init_point,
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Error al crear preferencia',
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`🚀 Backend corriendo en http://localhost:\${PORT}\`);
});
```

### Crear .env:

```env
MERCADOPAGO_ACCESS_TOKEN=TU_ACCESS_TOKEN_AQUI
```

### Ejecutar:

```bash
node server.js
```

## 🔗 Paso 3: Conectar Frontend con Backend

### Actualizar URL en frontend:

En `src/components/MercadoPagoCheckout.tsx`, cambia la línea:

```javascript
// ANTES (línea ~102):
const response = await fetch("/api/mercadopago/create-preference", {

// DESPUÉS:
const response = await fetch("http://localhost:3000/api/mercadopago/create-preference", {
```

## ✅ Paso 4: Probar

1. **Backend corriendo**: `http://localhost:3000`
2. **Frontend corriendo**: `http://localhost:5174`
3. **Ir a checkout** y hacer clic en "Pagar con MercadoPago"
4. **Deberías ver** el widget real de MercadoPago

## 🎯 ¿Qué hace la preferencia?

La preferencia le dice a MercadoPago:

- 📦 **Qué se está vendiendo** (productos, precios, cantidades)
- 💰 **Cuánto cobrar** (total, moneda)
- 🔄 **A dónde redirigir** después del pago (éxito, error, pendiente)
- 🏪 **Nombre del comercio** (aparece en el resumen)
- 📋 **Referencia única** para identificar el pedido

## 🆘 Si hay errores:

### Error de CORS:

Asegúrate que el backend permita localhost:5174

### Error de Access Token:

Verifica que sea el Access Token correcto (no Public Key)

### Puerto ocupado:

Cambia el puerto en server.js: `PORT = 3001`

¡Con esto tendrás pagos reales funcionando en minutos! 🎉
