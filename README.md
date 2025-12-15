# Soiree - Premium Ecommerce Platform

A modern React TypeScript ecommerce application built with Vite, Tailwind CSS, and Vitest.

## Features

- 🛍️ **Product Catalog** - Browse and search products with filtering
- 🛒 **Shopping Cart** - Add, remove, and manage cart items
- 💳 **WhatsApp Checkout** - Manual payment processing via WhatsApp
- 📦 **Persistent Inventory** - Limited edition products (1 unit per product)
- 🔄 **Stock Management** - Products stay sold out until manually restocked
- 👤 **User Authentication** - Sign up and sign in functionality
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast Performance** - Built with Vite for optimal speed
- 🎨 **Modern UI** - Glassmorphism design with Playfair Display typography
- 🧪 **Testing** - Unit tests with Vitest and Testing Library
- 🔧 **Development Tools** - Multi-interface RestockManager (keyboard, URL, visual overlay)

## Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest + Testing Library
- **Icons**: Heroicons
- **Routing**: React Router DOM

## Project Structure

```
src/
├── components/     # Reusable UI components + DevRestockOverlay
├── context/        # React Context (Cart & Inventory)
├── pages/          # Application pages/routes
├── hooks/          # Custom React hooks + restock shortcuts/URL hooks
├── types/          # TypeScript type definitions
├── utils/          # Utility functions, mock data & RestockManager
├── store/          # State management
└── test/           # Test setup and utilities
```

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm or yarn

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Lint code

## Features Overview

### Home Page

- Hero section with call-to-action
- Featured products showcase

### Products Page

- Full product catalog
- Search and filtering capabilities
- Sorting options (price, rating, name)
- Category filters

### Product Details

- Detailed product information
- Customer reviews and ratings
- Add to cart functionality
- Stock status

### Shopping Cart

- View cart items
- Update quantities
- Remove items
- Order summary

### Checkout

- Shipping address form
- Payment method selection
- Order summary and confirmation

### Authentication

- User sign up and sign in
- Form validation
- Responsive design

## Development

This project uses modern development practices:

- **TypeScript** for type safety
- **ESLint** for code linting
- **Tailwind CSS** for utility-first styling
- **Vitest** for testing
- **React Router** for navigation

### Inventory Management (Development)

The application includes a comprehensive RestockManager with multiple interfaces for managing inventory during development:

#### 1. ⌨️ Keyboard Shortcuts

```
Ctrl + Alt + R     → Restock all sold products
Ctrl + Alt + V     → View sold products in console
Ctrl + Alt + 1-9   → Restock specific product by ID
Ctrl + Alt + D     → Show/hide visual overlay panel
```

#### 2. 🌐 URL Parameters

```
http://localhost:5173/?restock=all      → Restock all products
http://localhost:5173/?restock=1,2,3    → Restock specific IDs
http://localhost:5173/?restock=clear    → Clear all localStorage
```

#### 3. 🎛️ Visual Overlay Panel

- Press `Ctrl + Alt + D` to show floating development panel
- Visual list of sold products with individual restock buttons
- One-click "Restock All" button
- Real-time sold products counter
- Integrated shortcuts reference

#### How it works

- Products have only **1 unit each** (limited edition boutique concept)
- When purchased via WhatsApp checkout, products are marked as sold
- Sold products persist in `localStorage` under key `'soiree-sold-products'`
- Products stay "Agotado" (sold out) until manually restocked
- RestockManager provides 4 different interfaces for development
- All restock tools are **development-only** and auto-disable in production

#### Alternative: Direct localStorage Access

```javascript
// View sold products
JSON.parse(localStorage.getItem("soiree-sold-products") || "[]");

// Clear all (or use URL: ?restock=clear)
localStorage.removeItem("soiree-sold-products");
window.location.reload();
```

#### Development Features

- **Multi-interface system**: Keyboard, URL, visual overlay
- **Production safety**: All tools disabled outside development
- **Real-time feedback**: Console logs and visual indicators
- **Workflow efficiency**: Choose your preferred restock method

## Testing

Run tests with:

```bash
npm run test
```

For interactive testing UI:

```bash
npm run test:ui
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run tests and linting
6. Submit a pull request

## License

This project is licensed under the MIT License.
