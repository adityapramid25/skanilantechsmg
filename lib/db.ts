export type User = {
  id: string;
  email: string;
  role: 'user' | 'admin';
};

export type ActiveDiscount = {
  id: string;
  productId: string;
  discountPrice: number;
  startDate: string; // ISO string
  endDate: string; // ISO string
};

// Mock data
export const mockProducts = [
  { id: 'p1', name: 'Wireless Headphones', description: 'High quality noise-canceling headphones.', price: 199 },
  { id: 'p2', name: 'Smart Watch', description: 'Track your fitness and stay connected.', price: 249 },
  { id: 'p3', name: 'Mechanical Keyboard', description: 'Tactile feedback for the best typing experience.', price: 129 },
];

// In-memory store for the active discount
let activeDiscount: ActiveDiscount | null = null;

export const db = {
  discount: {
    get: async () => activeDiscount,
    set: async (discount: ActiveDiscount) => {
      activeDiscount = discount;
      return activeDiscount;
    },
    clear: async () => {
      activeDiscount = null;
    }
  }
};
