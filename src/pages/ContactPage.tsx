import { useEffect } from "react";

export default function ContactPage() {
  // Número de WhatsApp desde variables de entorno
  const WHATSAPP_NUMBER =
    import.meta.env.VITE_WHATSAPP_NUMBER || "5491166590708";

  useEffect(() => {
    // Redireccionar inmediatamente a WhatsApp
    const message =
      "Hola! Me gustaría obtener más información sobre los productos de Soirée.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Pequeña demora para mostrar la página brevemente
    const timer = setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 1000);

    return () => clearTimeout(timer);
  }, [WHATSAPP_NUMBER]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          {/* Logo animado */}
          <div className="mb-8">
            <h1 className="text-6xl font-display font-light mb-4 text-white animate-pulse">
              Soirée
            </h1>
            <div className="w-24 h-0.5 bg-gold mx-auto"></div>
          </div>

          {/* Mensaje de redireccionamiento */}
          <div className="card bg-gray-950 p-8">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.297" />
                </svg>
              </div>

              <h2 className="text-2xl font-semibold text-white">
                Conectando con WhatsApp...
              </h2>

              <p className="text-gray-400">
                Te estamos redirigiendo a WhatsApp para ofrecerte atención
                personalizada.
              </p>

              <div className="flex items-center justify-center space-x-2 text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gold"></div>
                <span>Un momento por favor...</span>
              </div>
            </div>
          </div>

          {/* Información alternativa */}
          <div className="text-gray-500 text-sm">
            <p className="mb-2">¿No se abrió WhatsApp automáticamente?</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hola! Me gustaría obtener más información sobre los productos de Soirée."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gold hover:text-yellow-300 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.297" />
              </svg>
              Haz clic aquí para abrir WhatsApp manualmente
            </a>
          </div>

          {/* Información de contacto adicional */}
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-400 text-sm">
              <strong className="text-white">Email:</strong>{" "}
              vestidos.soiree@gmail.com
            </p>
            <p className="text-gray-400 text-sm mt-1">
              <strong className="text-white">WhatsApp:</strong> +
              {WHATSAPP_NUMBER}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
