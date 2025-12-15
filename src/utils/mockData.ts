import { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Vestido Cocktail Elegante, tipo Calvin",
    price: 45000,
    description: "Busto: 90cm, Cintura: 72cm, Cadera: 93cm.",
    image: "/calvin.png",
    images: [
      "/calvin.png",
      "/calvin1.jpg",
      "/calvin2.jpg",
      "/calvin3.jpg",
      "/calvin4.png",
      "/calvin5.png",
    ],
    category: "ropa",
    stock: 1,
  },
  {
    id: "2",
    name: "Bolso de Cuero Premium",
    price: 30000,
    description: `Bolso de compartimentos múltiples, uno con cierre. Correa ajustable.`,
    image: "/bolso1.jpg",
    category: "accesorios",
    stock: 1,
  },
  {
    id: "3",
    name: "Diamond Stud Earrings",
    price: 65000,
    description:
      "Aretes de diamante clásicos con engaste de oro blanco de 14k. Perfectos para uso diario o ocasiones especiales.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop",
    category: "joyería",
    stock: 1,
  },
  {
    id: "4",
    name: "Silk Scarf Collection",
    price: 32000,
    description:
      "Pañuelo de seda pura con patrones únicos hechos a mano. Versátil y elegante para cualquier atuendo.",
    image:
      "https://images.unsplash.com/photo-1591348122338-64b8c3ce37e2?w=400&h=600&fit=crop",
    category: "accesorios",
    stock: 1,
  },
  {
    id: "5",
    name: "Designer High Heels",
    price: 58000,
    description:
      "Zapatos de tacón alto diseñados por artesanos europeos. Comodidad y estilo en cada paso.",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=600&fit=crop",
    category: "calzado",
    stock: 1,
  },
  {
    id: "6",
    name: "Vintage Leather Jacket",
    price: 78000,
    description:
      "Chaqueta de cuero vintage auténtica con forro de seda. Un clásico atemporal que nunca pasa de moda.",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop",
    category: "ropa",
    stock: 1,
  },
  {
    id: "7",
    name: "Pearl Necklace Set",
    price: 42000,
    description:
      "Conjunto de collar y aretes de perlas cultivadas. Elegancia clásica para la mujer moderna.",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=600&fit=crop",
    category: "joyería",
    stock: 1,
  },
  {
    id: "8",
    name: "Cashmere Sweater",
    price: 68000,
    description:
      "Suéter de cashmere 100% puro con tejido artesanal. Suavidad y calidez incomparables.",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop",
    category: "ropa",
    stock: 1,
  },
];
