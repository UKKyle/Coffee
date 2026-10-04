export type CommerceProduct = {
  id: string;
  variantId: string;
  name: string;
  slug: string;
  price: number;
  compareAt?: number;
  tag: string;
  category: string;
  description: string;
  compatibility?: string;
  visual: string;
  stock?: 'in' | 'low' | 'out';
  image?: string;
};

export type CommerceCartLine = {
  lineId: string;
  product: CommerceProduct;
  qty: number;
  lineTotal: number;
};

export type CommerceCart = {
  id?: string;
  code?: string;
  lines: CommerceCartLine[];
  totalQuantity: number;
  subtotal: number;
  shipping: number;
  total: number;
};

export const vendureEnabled = true;

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: 'include',
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers || {}),
    },
  });
  const payload = await response.json() as T & { error?: string };
  if (!response.ok) throw new Error(payload.error || `Commerce request failed (${response.status})`);
  return payload;
}

export async function fetchVendureProducts(): Promise<CommerceProduct[]> {
  const data = await api<{ products: CommerceProduct[] }>('/api/products');
  return data.products;
}

export async function getActiveOrder(): Promise<CommerceCart> {
  return api<CommerceCart>('/api/cart');
}

export async function addVariantToOrder(variantId: string, quantity = 1): Promise<CommerceCart> {
  return api<CommerceCart>('/api/cart/items', {
    method: 'POST',
    body: JSON.stringify({ productId: variantId, quantity }),
  });
}

export async function adjustOrderLine(lineId: string, quantity: number): Promise<CommerceCart> {
  return api<CommerceCart>(`/api/cart/items/${encodeURIComponent(lineId)}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });
}

export async function removeOrderLine(lineId: string): Promise<CommerceCart> {
  return api<CommerceCart>(`/api/cart/items/${encodeURIComponent(lineId)}`, {
    method: 'DELETE',
  });
}
