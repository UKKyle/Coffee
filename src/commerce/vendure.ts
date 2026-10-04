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

const API_URL = (import.meta.env.VITE_VENDURE_SHOP_API || '').replace(/\/$/, '');
const TOKEN_KEY = 'standard-dose-vendure-token';

export const vendureEnabled = Boolean(API_URL);

const categoryFromName = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('matcha') || n.includes('whisk')) return 'Matcha';
  if (n.includes('iced') || n.includes('glass') || n.includes('syrup') || n.includes('cold')) return 'Iced';
  if (n.includes('coffee') || n.includes('bean') || n.includes('espresso blend')) return 'Coffee';
  if (n.includes('dosing cup') || n.includes('station') || n.includes('mat')) return 'Setup';
  return 'Espresso';
};

const visualFromName = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('screen')) return 'screen';
  if (n.includes('wdt') || n.includes('needle')) return 'wdt';
  if (n.includes('funnel')) return 'funnel';
  if (n.includes('cup')) return 'cup';
  if (n.includes('glass')) return 'glass';
  if (n.includes('pump') || n.includes('syrup')) return 'pump';
  if (n.includes('whisk') || n.includes('matcha')) return 'whisk';
  if (n.includes('coffee') || n.includes('bean') || n.includes('espresso')) return 'bag';
  return 'cup';
};

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!API_URL) throw new Error('Vendure Shop API is not configured');

  const headers: Record<string, string> = { 'content-type': 'application/json' };
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) headers.authorization = `Bearer ${token}`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({ query, variables }),
  });

  const nextToken = response.headers.get('vendure-auth-token');
  if (nextToken) localStorage.setItem(TOKEN_KEY, nextToken);

  if (!response.ok) throw new Error(`Vendure request failed (${response.status})`);
  const payload = await response.json() as { data?: T; errors?: { message: string }[] };
  if (payload.errors?.length) throw new Error(payload.errors.map(e => e.message).join('; '));
  if (!payload.data) throw new Error('Vendure returned no data');
  return payload.data;
}

const productFields = `
  id
  name
  slug
  description
  featuredAsset { preview }
  variants {
    id
    name
    priceWithTax
    currencyCode
    stockLevel
    featuredAsset { preview }
  }
`;

export async function fetchVendureProducts(): Promise<CommerceProduct[]> {
  const data = await gql<{
    products: {
      items: Array<{
        id: string;
        name: string;
        slug: string;
        description: string;
        featuredAsset?: { preview: string } | null;
        variants: Array<{
          id: string;
          name: string;
          priceWithTax: number;
          currencyCode: string;
          stockLevel: string;
          featuredAsset?: { preview: string } | null;
        }>;
      }>;
    };
  }>(`query StandardDoseProducts { products(options: { take: 100 }) { items { ${productFields} } } }`);

  return data.products.items.flatMap(product => product.variants.map(variant => {
    const stock = variant.stockLevel === 'OUT_OF_STOCK' ? 'out' : variant.stockLevel === 'LOW_STOCK' ? 'low' : 'in';
    return {
      id: product.id,
      variantId: variant.id,
      name: variant.name === product.name ? product.name : `${product.name} — ${variant.name}`,
      slug: product.slug,
      price: variant.priceWithTax / 100,
      tag: 'Standard Dose',
      category: categoryFromName(`${product.name} ${variant.name}`),
      description: product.description,
      visual: visualFromName(`${product.name} ${variant.name}`),
      stock,
      image: variant.featuredAsset?.preview || product.featuredAsset?.preview || undefined,
    } satisfies CommerceProduct;
  }));
}

const activeOrderFragment = `
  __typename
  ... on Order {
    id
    code
    totalQuantity
    subTotalWithTax
    shippingWithTax
    totalWithTax
    lines {
      id
      quantity
      linePriceWithTax
      productVariant {
        id
        name
        priceWithTax
        stockLevel
        product {
          id
          name
          slug
          description
          featuredAsset { preview }
        }
        featuredAsset { preview }
      }
    }
  }
  ... on ErrorResult { errorCode message }
`;

type VendureOrderResult = {
  __typename: string;
  errorCode?: string;
  message?: string;
  id?: string;
  code?: string;
  totalQuantity?: number;
  subTotalWithTax?: number;
  shippingWithTax?: number;
  totalWithTax?: number;
  lines?: Array<{
    id: string;
    quantity: number;
    linePriceWithTax: number;
    productVariant: {
      id: string;
      name: string;
      priceWithTax: number;
      stockLevel: string;
      featuredAsset?: { preview: string } | null;
      product: {
        id: string;
        name: string;
        slug: string;
        description: string;
        featuredAsset?: { preview: string } | null;
      };
    };
  }>;
};

function mapOrder(order: VendureOrderResult | null | undefined): CommerceCart {
  if (!order || order.__typename !== 'Order') {
    if (order?.message) throw new Error(order.message);
    return { lines: [], totalQuantity: 0, subtotal: 0, shipping: 0, total: 0 };
  }

  const lines = (order.lines || []).map(line => {
    const variant = line.productVariant;
    const product = variant.product;
    const name = variant.name === product.name ? product.name : `${product.name} — ${variant.name}`;
    return {
      lineId: line.id,
      qty: line.quantity,
      lineTotal: line.linePriceWithTax / 100,
      product: {
        id: product.id,
        variantId: variant.id,
        name,
        slug: product.slug,
        price: variant.priceWithTax / 100,
        tag: 'In your bag',
        category: categoryFromName(name),
        description: product.description,
        visual: visualFromName(name),
        stock: variant.stockLevel === 'LOW_STOCK' ? 'low' : variant.stockLevel === 'OUT_OF_STOCK' ? 'out' : 'in',
        image: variant.featuredAsset?.preview || product.featuredAsset?.preview || undefined,
      },
    } satisfies CommerceCartLine;
  });

  return {
    id: order.id,
    code: order.code,
    lines,
    totalQuantity: order.totalQuantity || 0,
    subtotal: (order.subTotalWithTax || 0) / 100,
    shipping: (order.shippingWithTax || 0) / 100,
    total: (order.totalWithTax || 0) / 100,
  };
}

export async function getActiveOrder(): Promise<CommerceCart> {
  const data = await gql<{ activeOrder: VendureOrderResult | null }>(`
    query StandardDoseActiveOrder {
      activeOrder { ${activeOrderFragment} }
    }
  `);
  return mapOrder(data.activeOrder);
}

export async function addVariantToOrder(variantId: string, quantity = 1): Promise<CommerceCart> {
  const data = await gql<{ addItemToOrder: VendureOrderResult }>(`
    mutation StandardDoseAddItem($productVariantId: ID!, $quantity: Int!) {
      addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) { ${activeOrderFragment} }
    }
  `, { productVariantId: variantId, quantity });
  return mapOrder(data.addItemToOrder);
}

export async function adjustOrderLine(lineId: string, quantity: number): Promise<CommerceCart> {
  const data = await gql<{ adjustOrderLine: VendureOrderResult }>(`
    mutation StandardDoseAdjustLine($orderLineId: ID!, $quantity: Int!) {
      adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) { ${activeOrderFragment} }
    }
  `, { orderLineId: lineId, quantity });
  return mapOrder(data.adjustOrderLine);
}

export async function removeOrderLine(lineId: string): Promise<CommerceCart> {
  const data = await gql<{ removeOrderLine: VendureOrderResult }>(`
    mutation StandardDoseRemoveLine($orderLineId: ID!) {
      removeOrderLine(orderLineId: $orderLineId) { ${activeOrderFragment} }
    }
  `, { orderLineId: lineId });
  return mapOrder(data.removeOrderLine);
}
