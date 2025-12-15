import { Link } from "react-router-dom";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { itemsCount } = useCart();

  return (
    <header className="bg-black/90 backdrop-blur-lg border-b border-white/10 fixed top-0 w-full z-50 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img
                src="/logo.png"
                alt="Soirée Logo"
                className="h-10 w-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-12 font-sans">
            <Link
              to="/"
              className="text-white/80 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-all duration-300 font-medium tracking-wide"
            >
              Inicio
            </Link>
            <Link
              to="/products"
              className="text-white/80 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-all duration-300 font-medium tracking-wide"
            >
              Productos
            </Link>
            <Link
              to="/lookbook"
              className="text-white/80 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-all duration-300 font-medium tracking-wide"
            >
              Lookbook
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ShoppingCartIcon className="h-6 w-6 text-neutral-700" />
              {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Link>
            <Link
              to="/auth"
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <UserIcon className="h-6 w-6 text-neutral-700" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
