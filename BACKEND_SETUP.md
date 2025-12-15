# 🔧 Backend para MercadoPago - Guía Paso a Paso

## 🎯 Problema Actual

- ✅ Frontend configurado con Public Key
- ❌ Backend faltante para crear preferencias
- ❌ Error: "Error al crear la preferencia de pago"

## 🚀 Solución: Configurar Backend

### Opción 1: Backend con Node.js (Recomendado)

#### 1. Crear servidor básico

```bash
mkdir soiree-backend
cd soiree-backend
npm init -y
npm install express mercadopago cors dotenv
```

#### 2. Crear server.js

```javascript
const express = require('express');
const mercadopago = require('mercadopago');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configurar CORS para tu frontend
app.use(cors({
  origin: 'http://localhost:5174' // Tu frontend
}));

app.use(express.json());

// Configurar MercadoPago con tu Access Token
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

// Endpoint para crear preferencias
app.post('/api/mercadopago/create-preference', async (req, res) => {
    try {
        const preference = {
            items: req.body.items,
            payer: req.body.payer,
            back_urls: req.body.back_urls,
            auto_return: 'approved',
            payment_methods: req.body.payment_methods,
            shipments: req.body.shipments,
            statement_descriptor: req.body.statement_descriptor,
            external_reference: req.body.external_reference,
        };

        const response = await mercadopago.preferences.create(preference);
        res.json({ id: response.body.id });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al crear la preferencia' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(\`🚀 Backend corriendo en puerto \${PORT}\`);
});
```

#### 3. Crear .env en backend

```env
MERCADOPAGO_ACCESS_TOKEN=TU_ACCESS_TOKEN_AQUI
```

#### 4. Ejecutar backend

```bash
node server.js
```

### Opción 2: Backend con Netlify Functions

#### 1. Crear netlify/functions/create-preference.js

```javascript
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const preference = await mercadopago.preferences.create(data);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: preference.body.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

### Opción 3: Backend con Vercel

#### 1. Crear api/mercadopago/create-preference.js

```javascript
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const preference = await mercadopago.preferences.create(req.body);
    res.status(200).json({ id: preference.body.id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al crear la preferencia" });
  }
}
```

## 🔑 Obtener Access Token

1. Ve a [MercadoPago Developers](https://www.mercadopago.com.ar/developers)
2. Entra a tu aplicación
3. Ve a "Credenciales"
4. Copia tu **Access Token** (no el Public Key)

## 🔧 Configurar Frontend para Backend

Si usas un backend local, actualiza la URL en MercadoPagoCheckout.tsx:

```javascript
// Cambiar de:
const response = await fetch("/api/mercadopago/create-preference", {

// A:
const response = await fetch("http://localhost:3000/api/mercadopago/create-preference", {
```

## ✅ Verificación

1. **Backend corriendo** - Debes ver "Backend corriendo en puerto 3000"
2. **Frontend funcionando** - http://localhost:5174
3. **Prueba completa** - Ve a checkout y haz clic en "Pagar con MercadoPago"
4. **Widget real** - Deberías ver el widget oficial de MercadoPago

## 🆘 Problemas Comunes

### CORS Error

Asegúrate de configurar CORS en tu backend para permitir http://localhost:5174

### Access Token Incorrecto

Verifica que uses el Access Token (no el Public Key) en el backend

### Puerto Diferente

Si tu frontend corre en otro puerto, actualiza la configuración CORS

## 📚 Recursos

- [Documentación MercadoPago Checkout Pro](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/landing)
- [SDK Node.js](https://www.mercadopago.com.ar/developers/es/docs/sdks-library/server-side/nodejs)
- [Guía de Credenciales](https://www.mercadopago.com.ar/developers/es/guides/resources/credentials)
