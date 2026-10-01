import { apiClient } from './apiClient';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export async function fetchProducts(): Promise<Product[]> {
  const response = await apiClient.get<Product[]>('/products?limit=12');
  return response.data;
}