import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import {
  addProductToCart,
  CommerceCart,
  CommerceProduct,
  fetchProducts,
  getCart,
  removeCartLine,
  setCartLineQuantity,
} from './commerce/cloudflare';

type Product = CommerceProduct;
type LocalCartItem = { product: Product; qty: number };

const fallbackProducts: Product[] = [
  { id:'puck-screen', variantId:'puck-screen', slug:'58mm-puck-screen', name:'58mm Puck Screen', price:5.95, tag:'Best seller', category:'Espresso', description:'A fine stainless screen designed to distribute water more evenly and keep the group head cleaner.', compatibility:'58mm baskets', visual:'screen', stock:'in' },
  { id:'wdt-tool', variantId:'wdt-tool', slug:'needle-wdt-tool', name:'Needle WDT Tool', price:9.95, tag:'Dial-in essential', category:'Espresso', description:'A weighted, fine-needle distribution tool for breaking clumps and levelling your puck before tamping.', compatibility:'All espresso baskets', visual:'wdt', stock:'in' },
  { id:'dosing-funnel', variantId:'dosing-funnel', slug:'magnetic-dosing-funnel', name:'Magnetic Dosing Funnel', price:8.95, tag:'Under £10', category:'Espresso', description:'Low-profile magnetic dosing funnel that keeps grounds in the basket while you grind and distribute.', compatibility:'58mm portafilters', visual:'funnel', stock:'in' },
  { id:'dosing-cup', variantId:'dosing-cup', slug:'stainless-dosing-cup', name:'Stainless Dosing Cup', price:11.95, tag:'Setup upgrade', category:'Setup', description:'Brushed stainless dosing cup with a clean lip for transferring grounds without mess.', compatibility:'58mm workflows', visual:'cup', stock:'in' },
  { id:'latte-glass', variantId:'latte-glass', slug:'ribbed-iced-latte-glass', name:'Ribbed Iced Latte Glass', price:7.95, tag:'Just landed', category:'Iced', description:'Tall ribbed glass for iced lattes, cold brew and anything layered.', visual:'glass', stock:'low' },
  { id:'syrup-pump', variantId:'syrup-pump', slug:'minimal-syrup-pump', name:'Minimal Syrup Pump', price:4.95, tag:'£5 shelf', category:'Iced', description:'Simple reusable syrup pump sized for compact coffee stations.', visual:'pump', stock:'in' },
  { id:'matcha-whisk', variantId:'matcha-whisk', slug:'bamboo-matcha-whisk', name:'Bamboo Matcha Whisk', price:12.95, tag:'Ritual essential', category:'Matcha', description:'Traditional bamboo whisk for smoother matcha and a cleaner morning ritual.', visual:'whisk', stock:'in' },
  { id:'house-beans', variantId:'house-beans', slug:'house-espresso-250g', name:'House Espresso — 250g', price:10.95, tag:'Repeat order', category:'Coffee', description:'A balanced everyday espresso profile selected for milk drinks and straight shots.', visual:'bag', stock:'in' },
];

const categories = [
  ['Espresso', 'Prep, pull, repeat.'],
  ['Iced', 'Glassware, syrups & cold brew.'],
  ['Matcha', 'Tools for a cleaner ritual.'],
  ['Coffee', 'Beans, filters & repeat orders.'],
];

const money = (value:number) => `£${value.toFixed(2)}`;

function ProductVisual({ product }:{ product:Product }) {
  if (product.image) return <div className="product-visual real-image"><img src={product.image} alt="" /></div>;
  return <div className={`product-visual visual-${product.visual}`} aria-hidden="true"><i/><b/></div>;
}

function ProductCard({ product, onView, onAdd }:{ product:Product; onView:(p:Product)=>void; onAdd:(p:Product)=>void }) {
  return (
    <article className="product-card">
      <button className="product-image-button" onClick={() => onView(product)} aria-label={`View ${product.name}`}>
        <ProductVisual product={product}/>
        <span className="product-badge">{product.tag}</span>
      </button>
      <div className="product-meta">
        <button className="product-name" onClick={() => onView(product)}>{product.name}</button>
        <div className="price-row"><strong>{money(product.price)}</strong>{product.compareAt && <del>{money(product.compareAt)}</del>}</div>
        {product.stock === 'low' && <span className="low-stock">Low stock</span>}
        {product.stock === 'out' && <span className="low-stock">Out of stock</span>}
      </div>
      <button className="quick-add" disabled={product.stock === 'out'} type="button" onClick={() => onAdd(product)}>{product.stock === 'out' ? 'Unavailable' : 'Quick add'} <span>+</span></button>
    </article>
  );
}

function App() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [localCart, setLocalCart] = useState<LocalCartItem[]>([]);
  const [serverCart, setServerCart] = useState<CommerceCart | null>(null);
  const [commerceLive, setCommerceLive] = useState(false);
  const [commerceError, setCommerceError] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    Promise.all([fetchProducts(), getCart()])
      .then(([catalogue, cart]) => {
        if (catalogue.length) setProducts(catalogue);
        setServerCart(cart);
        setCommerceLive(true);
      })
      .catch(error => {
        console.error('Cloudflare commerce connection failed; local fallback remains active.', error);
        setCommerceError(error instanceof Error ? error.message : 'Commerce service unavailable');
      });
  }, []);

  const cartItems = commerceLive
    ? (serverCart?.lines || []).map(line => ({ product: line.product, qty: line.qty, lineId: line.lineId }))
    : localCart.map(item => ({ ...item, lineId: item.product.id }));
  const cartCount = commerceLive ? (serverCart?.totalQuantity || 0) : localCart.reduce((sum,item) => sum + item.qty, 0);
  const subtotal = commerceLive ? (serverCart?.subtotal || 0) : localCart.reduce((sum,item) => sum + item.product.price * item.qty, 0);
  const freeDeliveryProgress = Math.min(100, (subtotal / 30) * 100);

  const addToCart = async (product:Product) => {
    if (commerceLive) {
      try {
        setServerCart(await addProductToCart(product.id, 1));
      } catch (error) {
        setCommerceError(error instanceof Error ? error.message : 'Could not add item');
        return;
      }
    } else {
      setLocalCart(items => {
        const existing = items.find(item => item.product.variantId === product.variantId);
        return existing
          ? items.map(item => item.product.variantId === product.variantId ? {...item, qty:item.qty + 1} : item)
          : [...items, {product, qty:1}];
      });
    }
    setCartOpen(true);
  };

  const changeQty = async (lineId:string, currentQty:number, delta:number) => {
    const nextQty = currentQty + delta;
    if (commerceLive) {
      try {
        setServerCart(nextQty <= 0 ? await removeCartLine(lineId) : await setCartLineQuantity(lineId, nextQty));
      } catch (error) {
        setCommerceError(error instanceof Error ? error.message : 'Could not update bag');
      }
      return;
    }
    setLocalCart(items => items.map(item => item.product.id === lineId ? {...item, qty:item.qty + delta} : item).filter(item => item.qty > 0));
  };

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(product => {
      const categoryMatch = activeCategory === 'All' || product.category === activeCategory;
      const searchMatch = !q || `${product.name} ${product.category} ${product.tag}`.toLowerCase().includes(q);
      return categoryMatch && searchMatch;
    });
  }, [products, query, activeCategory]);

  const scrollToShop = (category:string) => {
    setActiveCategory(category);
    setMenuOpen(false);
    requestAnimationFrame(() => document.querySelector('#shop')?.scrollIntoView({behavior:'smooth'}));
  };

  const addStarterSetup = async () => {
    const starter = fallbackProducts.slice(0,4).map(f => products.find(p => p.name.toLowerCase().includes(f.name.split(' ')[0].toLowerCase()))).filter(Boolean) as Product[];
    for (const product of starter) await addToCart(product);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Standard Dose home">STANDARD DOSE</a>
        <nav aria-label="Primary navigation">
          <button onClick={() => scrollToShop('All')}>Shop</button>
          <a href="#rituals">Rituals</a>
          <a href="#drops">Just landed</a>
          <button onClick={() => setSearchOpen(true)}>Search</button>
        </nav>
        <div className="header-actions">
          <button className="mobile-menu-button" onClick={() => setMenuOpen(true)}>Menu</button>
          <button className="cart" type="button" onClick={() => setCartOpen(true)} aria-label={`Basket with ${cartCount} items`}>BAG <span>{cartCount}</span></button>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">HOME COFFEE, DIALED IN.</p>
          <h1>Make the ritual<br/>feel better.</h1>
          <p className="hero-sub">Tools, coffee and objects for the home barista.</p>
          <button className="cta" onClick={() => scrollToShop('All')}>Shop the setup</button>
        </div>
        <div className="hero-media-shell">
          <video className="hero-video" autoPlay muted playsInline loop preload="auto" poster="https://images.pexels.com/photos/6205575/pexels-photo-6205575.jpeg?auto=compress&cs=tinysrgb&w=2200&q=94" aria-label="Barista inserting and locking a portafilter into an espresso machine">
            <source src="https://www.pexels.com/download/video/7487673/" type="video/mp4" />
          </video>
          <div className="hero-photo-fallback" aria-hidden="true" />
        </div>
        <div className="hero-vignette" />
      </section>

      <section id="rituals" className="section rituals">
        <div className="section-head"><p className="eyebrow">SHOP BY RITUAL</p><h2>Start where you drink.</h2></div>
        <div className="ritual-grid">
          {categories.map(([title, copy], index) => (
            <button className="ritual-card" onClick={() => scrollToShop(title)} key={title}>
              <span className="ritual-index">0{index + 1}</span><span className="arrow">↗</span>
              <span className="ritual-copy"><strong>{title}</strong><small>{copy}</small></span>
            </button>
          ))}
        </div>
      </section>

      <section id="shop" className="section shop-section">
        <div className="section-head split"><div><p className="eyebrow">SHOP THE EDIT</p><h2>Small upgrades.<br/>Better coffee.</h2></div><button onClick={() => setSearchOpen(true)}>Search products →</button></div>
        <div className="category-tabs">{['All','Espresso','Iced','Matcha','Coffee','Setup'].map(category => <button key={category} className={activeCategory === category ? 'active':''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
        <div className="product-grid">{filteredProducts.map(product => <ProductCard key={product.variantId} product={product} onView={setActiveProduct} onAdd={addToCart}/>)}</div>
      </section>

      <section className="section setup-builder">
        <div className="setup-copy"><p className="eyebrow">BUILD YOUR SETUP</p><h2>Start with the four pieces you’ll touch every shot.</h2><p>Puck prep, dosing and a cleaner workflow—without buying an entire coffee lab.</p><button className="dark-cta" onClick={addStarterSetup}>Add starter setup</button></div>
        <div className="setup-stack">{products.slice(0,4).map((p,i)=><div className={`setup-item setup-${i}`} key={p.variantId}><ProductVisual product={p}/><span>{p.name}</span></div>)}</div>
      </section>

      <section className="section value-strip">
        <div><strong>FREE DELIVERY OVER £30</strong><span>Easy to build a setup, easy to come back.</span></div>
        <div><strong>UK-FIRST FULFILMENT</strong><span>Delivery rules will come from the final supplier mix.</span></div>
        <div><strong>{commerceLive ? 'LIVE CLOUDFLARE CART' : 'COMMERCE FALLBACK ACTIVE'}</strong><span>{commerceLive ? 'Catalogue and bag are backed by D1.' : 'The storefront stays usable if the commerce API is unavailable.'}</span></div>
      </section>

      <section className="section deal" id="drops">
        <div><p className="eyebrow">THE £5 SHELF</p><h2>Good gear.<br/>No coffee tax.</h2><p>Small upgrades, rotating finds and the bits you should never have to overpay for.</p></div>
        <button className="deal-orb" onClick={() => scrollToShop('Iced')}><span>UNDER</span><strong>£5</strong><small>SHOP →</small></button>
      </section>

      <section className="section just-landed">
        <div className="section-head split"><div><p className="eyebrow">JUST LANDED</p><h2>New on the counter.</h2></div><button onClick={() => setSearchOpen(true)}>View all →</button></div>
        <div className="landed-grid">{products.slice(-3).map(p => <ProductCard key={p.variantId} product={p} onView={setActiveProduct} onAdd={addToCart}/>)}</div>
      </section>

      <section className="section editorial">
        <div className="steel-panel"><div className="steel-disc"></div><div className="steel-line"></div></div>
        <div><p className="eyebrow">BUILT FOR THE RITUAL</p><h2>Your counter should work as good as it looks.</h2><p>Useful tools, tactile materials and coffee-station objects chosen to make everyday espresso feel more considered—without turning a simple setup into a luxury-tax exercise.</p></div>
      </section>

      <footer><span>STANDARD DOSE™</span><span>HOME COFFEE, DIALED IN.</span></footer>

      {cartOpen && <>
        <button className="overlay" aria-label="Close bag" onClick={() => setCartOpen(false)}/>
        <aside className="cart-drawer">
          <div className="drawer-head"><div><span>YOUR BAG</span><strong>{cartCount} {cartCount === 1 ? 'ITEM':'ITEMS'}</strong></div><button onClick={() => setCartOpen(false)}>×</button></div>
          <div className="shipping-meter"><div><i style={{width:`${freeDeliveryProgress}%`}}/></div><span>{subtotal >= 30 ? 'You’ve unlocked free delivery.' : `${money(Math.max(0,30 - subtotal))} away from free delivery.`}</span></div>
          {commerceError && <div className="commerce-note">{commerceError}</div>}
          <div className="cart-lines">
            {cartItems.length === 0 && <div className="empty-cart"><h3>Your bag is empty.</h3><p>Start with the small upgrades.</p><button onClick={() => {setCartOpen(false); scrollToShop('All');}}>Shop the edit</button></div>}
            {cartItems.map(item => <div className="cart-line" key={item.lineId}><ProductVisual product={item.product}/><div><strong>{item.product.name}</strong><span>{money(item.product.price)}</span><div className="qty"><button onClick={() => changeQty(item.lineId,item.qty,-1)}>−</button><span>{item.qty}</span><button onClick={() => changeQty(item.lineId,item.qty,1)}>+</button></div></div></div>)}
          </div>
          {cartItems.length > 0 && <div className="cart-footer"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><button disabled>{commerceLive ? 'Checkout coming next' : 'Checkout unavailable'}</button><small>{commerceLive ? 'Your bag is stored in Cloudflare D1.' : 'Local fallback bag only — no payment is being taken.'}</small></div>}
        </aside>
      </>}

      {searchOpen && <div className="search-overlay">
        <div className="search-head"><span>SEARCH STANDARD DOSE</span><button onClick={() => {setSearchOpen(false); setQuery('');}}>×</button></div>
        <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search puck screens, glassware, coffee…"/>
        <div className="search-results">{(query ? filteredProducts : products.slice(0,5)).map(product => <button key={product.variantId} onClick={() => {setSearchOpen(false); setQuery(''); setActiveProduct(product);}}><ProductVisual product={product}/><span><strong>{product.name}</strong><small>{product.category} · {money(product.price)}</small></span><b>↗</b></button>)}</div>
      </div>}

      {menuOpen && <div className="mobile-menu"><button className="menu-close" onClick={() => setMenuOpen(false)}>×</button><span>STANDARD DOSE</span><button onClick={() => scrollToShop('All')}>Shop</button>{categories.map(([title]) => <button key={title} onClick={() => scrollToShop(title)}>{title}</button>)}<button onClick={() => {setMenuOpen(false);setSearchOpen(true);}}>Search</button></div>}

      {activeProduct && <>
        <button className="overlay product-overlay" aria-label="Close product" onClick={() => setActiveProduct(null)}/>
        <section className="product-detail">
          <button className="detail-close" onClick={() => setActiveProduct(null)}>×</button>
          <div className="detail-visual"><ProductVisual product={activeProduct}/></div>
          <div className="detail-copy"><p className="eyebrow">{activeProduct.tag}</p><h2>{activeProduct.name}</h2><div className="detail-price">{money(activeProduct.price)}</div><p>{activeProduct.description}</p>{activeProduct.compatibility && <div className="spec"><span>Compatibility</span><strong>{activeProduct.compatibility}</strong></div>}<div className="spec"><span>Stock</span><strong>{activeProduct.stock === 'out' ? 'Unavailable' : activeProduct.stock === 'low' ? 'Low stock' : 'Available'}</strong></div><button className="detail-add" disabled={activeProduct.stock === 'out'} onClick={() => addToCart(activeProduct)}>Add to bag · {money(activeProduct.price)}</button></div>
        </section>
      </>}
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
