# 🎯 Guía Completa: De Simulación a Pagos Reales

## 📊 Estado Actual

- ✅ **Frontend**: Funcionando con simulación
- ✅ **MercadoPago SDK**: Inicializado correctamente
- ⚠️ **Backend**: Faltante (por eso la simulación)

## 🚀 Pasos para Activar Pagos Reales

### Paso 1: Crear Backend (5 minutos)

```bash
# En otra terminal, fuera de la carpeta Soiree
mkdir soiree-backend
cd soiree-backend
npm init -y
npm install express mercadopago cors dotenv
```

### Paso 2: Crear server.js

Copiar el código de `BACKEND_RAPIDO.md` completo.

### Paso 3: Configurar .env del backend

```env
MERCADOPAGO_ACCESS_TOKEN=TU_ACCESS_TOKEN_DE_MERCADOPAGO
```

### Paso 4: Ejecutar backend

```bash
node server.js
# Debes ver: "🚀 Backend corriendo en http://localhost:3000"
```

### Paso 5: Activar backend en frontend

En tu archivo `.env` del frontend, agrega:

```env
VITE_USE_REAL_BACKEND=true
VITE_BACKEND_URL=http://localhost:3000
```

### Paso 6: Reiniciar frontend

```bash
# Ctrl+C para parar
npm run dev
```

## ✅ Verificación Final

1. **Backend**: http://localhost:3000 (corriendo)
2. **Frontend**: http://localhost:5174 (corriendo)
3. **Checkout**: Ve a checkout y haz clic en "Pagar"
4. **Widget real**: Debes ver el widget oficial de MercadoPago
5. **Consola**: "🚀 Creando preferencia REAL con backend"

## 🧪 Prueba con Tarjeta

- **Número**: 4509 9535 6623 3704
- **CVV**: 123
- **Vencimiento**: 11/25
- **Titular**: APRO

## 🔧 Modo Desarrollo vs Producción

### Desarrollo (actual):

```env
VITE_USE_REAL_BACKEND=false  # Simulación
```

### Producción:

```env
VITE_USE_REAL_BACKEND=true   # Backend real
VITE_BACKEND_URL=http://localhost:3000
```

## 🎉 Resultado

Después de estos pasos:

- ✅ **Preferencias reales** creadas en MercadoPago
- ✅ **Widget oficial** funcionando
- ✅ **Pagos procesados** correctamente
- ✅ **Redirecciones** a páginas de éxito/error
- ✅ **Carrito vaciado** automáticamente tras pago exitoso

¡Tu ecommerce estará 100% funcional para recibir pagos reales! 🛍️💳
