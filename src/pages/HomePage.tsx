import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function HomePage() {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="pt-20">
      {" "}
      {/* Padding top para el header fijo */}
      {/* Hero Section */}
      <section className="gradient-hero text-white min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <h1
              className="text-6xl md:text-8xl font-display font-light mb-6 tracking-wider text-white"
              style={{
                textShadow: "0 0 30px rgba(255,255,255,0.3)",
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
              }}
            >
              Soirée
            </h1>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8 opacity-60"></div>
            <h2 className="text-2xl md:text-4xl font-display font-light italic mb-8 text-white/90 tracking-widest">
              Potencia tu Belleza
            </h2>
          </div>

          <p className="text-lg md:text-xl mb-12 opacity-80 font-sans max-w-2xl mx-auto leading-relaxed">
            Descubre productos premium para tus momentos especiales
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
            <Link
              to="/products"
              className="inline-block bg-white text-black px-12 py-4 rounded-full font-semibold font-sans hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-[0_20px_50px_-12px_rgba(255,255,255,0.3)] transform hover:scale-105"
            >
              Explorar Colección
            </Link>
            <button className="inline-block border-2 border-white text-white px-12 py-4 rounded-full font-semibold font-sans hover:bg-white hover:text-black transition-all duration-300">
              Ver Lookbook
            </button>
          </div>
        </div>

        {/* Elementos decorativos flotantes */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-white/10 rounded-full animate-pulse"></div>
      </section>
      {/* Featured Products */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-light text-white mb-6 tracking-wide">
              Colección Destacada
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6 opacity-40"></div>
            <p className="text-white/70 text-lg font-sans max-w-2xl mx-auto">
              Descubre nuestras piezas más exclusivas, cuidadosamente
              seleccionadas para ocasiones especiales
            </p>
          </div>
          {loading ? (
            <div className="text-center">Cargando...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
