import { useRestockShortcuts } from "../hooks/useRestockShortcuts";
import { useURLRestock } from "../hooks/useURLRestock";
import DevRestockOverlay from "../components/DevRestockOverlay";

/**
 * Sistema unificado de restock para desarrollo
 * Combina todas las funcionalidades:
 * - Atajos de teclado
 * - URL parameters
 * - Overlay flotante
 * - Debugger de persistencia
 */
export default function RestockManager() {
  // Solo en desarrollo
  if (typeof process !== 'undefined' && process.env.NODE_ENV !== "development") return null;

  // Activar todos los sistemas
  useRestockShortcuts();
  useURLRestock();

  return <DevRestockOverlay />;
}
