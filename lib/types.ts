export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ActivePromo {
  productId: string;
  discountPrice: number;
  endTime: string; // ISO String
}
