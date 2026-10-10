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
  stockOnHand?: number;
};

export type CommerceCartLine = {
  lineId: string;
  product: CommerceProduct;
  qty: number;
  lineTotal: number;
};

export type CommerceCart = {
  id?: string;
  lines: CommerceCartLine[];
  totalQuantity: number;
  subtotal: number;
  shipping: number;
  total: number;
};

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    credentials: 'include',
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof payload?.error === 'string' ? payload.error : `Request failed (${response.status})`;
    throw new Error(message);
  }
  return payload as T;
}

export async function fetchProducts(): Promise<CommerceProduct[]> {
  const data = await api<{ products: CommerceProduct[] }>('/api/products');
  return data.products || [];
}

export async function getCart(): Promise<CommerceCart> {
  return api<CommerceCart>('/api/cart');
}

export async function addProductToCart(productId: string, quantity = 1): Promise<CommerceCart> {
  return api<CommerceCart>('/api/cart/items', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function setCartLineQuantity(lineId: string, quantity: number): Promise<CommerceCart> {
  if (quantity <= 0) return removeCartLine(lineId);
  return api<CommerceCart>(`/api/cart/items/${encodeURIComponent(lineId)}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });
}

export async function removeCartLine(lineId: string): Promise<CommerceCart> {
  return api<CommerceCart>(`/api/cart/items/${encodeURIComponent(lineId)}`, {
    method: 'DELETE',
  });
}
