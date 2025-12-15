# 🔐 Guía Rápida: Configuración Segura de MercadoPago

## 📝 Pasos para agregar tu Public Key

### 1. Abre el archivo `.env`

```bash
# En la raíz del proyecto
code .env
```

### 2. Agrega tu Public Key

```env
# Reemplaza con tu clave real de MercadoPago
VITE_MERCADOPAGO_PUBLIC_KEY=TEST-tu-public-key-real-aqui
```

### 3. Reinicia el servidor

```bash
npm run dev
```

## ✅ Verificación

- ✅ **SDK instalado** - @mercadopago/sdk-react configurado
- ✅ **Credenciales configuradas** - Public Key en .env
- ✅ **Inicialización automática** - Se inicializa cuando cargas /checkout
- Ve a http://localhost:5174/checkout
- Completa el formulario
- Deberías ver "Inicializando MercadoPago..." y luego el widget de pago

## 🧪 Prueba el Pago

1. **Agrega productos al carrito** desde http://localhost:5174/products
2. **Ve al checkout** http://localhost:5174/checkout
3. **Completa el formulario** (todos los campos con \*)
4. **Verás el botón "Pagar con MercadoPago"**
5. **Usa tarjetas de prueba**:
   - **Visa**: 4509 9535 6623 3704
   - **CVV**: 123
   - **Fecha**: 11/25
   - **Titular**: APRO

## 🛡️ Seguridad Garantizada

- ✅ `.env` está en `.gitignore`
- ✅ Tus credenciales NO se subirán a Git
- ✅ Solo tú tendrás acceso a las claves
- ✅ Variables de entorno tipadas en TypeScript

## 📋 Ejemplo de `.env` completo:

```env
VITE_MERCADOPAGO_PUBLIC_KEY=TEST-12345678-90ab-cdef-1234-567890abcdef
```

¡Listo! Tu integración estará 100% funcional y segura.
