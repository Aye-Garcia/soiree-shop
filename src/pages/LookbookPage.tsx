import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { formatPrice } from "../utils/formatPrice";
import ProductCard from "../components/ProductCard";

export default function LookbookPage() {
  const { products } = useProducts();

  // Crear looks combinando productos
  const looks = [
    {
      id: "look-1",
      title: "Elegancia Nocturna",
      description:
        "Para noches especiales que requieren sofisticación absoluta",
      image:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop",
      products: products.filter((p) => ["1", "3", "5"].includes(p.id)), // Vestido, earrings, heels
      mood: "Glamour",
      occasion: "Cenas formales, galas, eventos nocturnos",
    },
    {
      id: "look-2",
      title: "Sofisticación Casual",
      description: "Cuando quieres lucir elegante sin esfuerzo aparente",
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop",
      products: products.filter((p) => ["6", "2", "4"].includes(p.id)), // Jacket, bag, scarf
      mood: "Chic",
      occasion: "Reuniones, citas, eventos diurnos",
    },
    {
      id: "look-3",
      title: "Lujo Atemporal",
      description: "Piezas clásicas que nunca pasan de moda",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=1000&fit=crop",
      products: products.filter((p) => ["7", "8"].includes(p.id)), // Pearls, cashmere
      mood: "Clásico",
      occasion: "Cualquier ocasión especial",
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-8xl font-display font-light mb-6 text-white tracking-wider">
            Lookbook
          </h1>
          <div className="w-32 h-0.5 bg-gold mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Descubre cómo combinar nuestras piezas exclusivas para crear looks
            únicos que reflejen tu personalidad y estilo.
          </p>
        </div>
      </section>

      {/* Looks Collection */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {looks.map((look, index) => (
              <div
                key={look.id}
                className={`grid lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Look Image */}
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative group">
                    <img
                      src={look.image}
                      alt={look.title}
                      className="w-full h-[600px] object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-2xl group-hover:bg-black/10 transition-all duration-500"></div>

                    {/* Mood Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                        {look.mood}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Look Details */}
                <div
                  className={`space-y-8 ${
                    index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-display font-light text-white">
                      {look.title}
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {look.description}
                    </p>
                  </div>

                  {/* Occasion */}
                  <div className="space-y-2">
                    <h3 className="text-gold font-semibold text-sm uppercase tracking-wide">
                      Perfecta para:
                    </h3>
                    <p className="text-gray-300">{look.occasion}</p>
                  </div>

                  {/* Products in Look */}
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold text-lg">
                      Productos en este look:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {look.products.map((product) => (
                        <div
                          key={product.id}
                          className="glass-card p-4 rounded-xl"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-contain bg-gray-900 rounded-lg"
                              style={{ imageRendering: "crisp-edges" }}
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium text-sm truncate">
                                {product.name}
                              </h4>
                              <p className="text-gold text-sm">
                                {formatPrice(product.price)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <Link
                      to="/products"
                      className="inline-flex items-center bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 group"
                    >
                      Explorar Productos
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-light text-white mb-4">
              Todas las Piezas de la Colección
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Cada producto es una edición limitada, diseñado para mujeres que
              buscan exclusividad y elegancia en cada detalle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Styling Tips */}
      <section className="py-16 bg-gray-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-light text-white mb-8">
            Consejos de Estilo
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">
                Calidad sobre Cantidad
              </h3>
              <p className="text-gray-400 text-sm">
                Invierte en piezas clásicas y atemporales que puedas usar en
                múltiples ocasiones.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Combina Texturas</h3>
              <p className="text-gray-400 text-sm">
                Mezcla diferentes texturas como seda, cuero y cashmere para
                crear depth visual.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Confianza Personal</h3>
              <p className="text-gray-400 text-sm">
                El mejor accesorio es tu confianza. Elige piezas que te hagan
                sentir auténtica.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
