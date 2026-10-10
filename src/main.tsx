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
const categories = [
  ['Espresso', 'Puck prep, dosing & extraction.'],
  ['Iced', 'Glassware & cold coffee.'],
  ['Matcha', 'Whisks, bowls & tools.'],
  ['Coffee', 'Beans & brew essentials.'],
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
        {product.tag && <span className="product-badge">{product.tag}</span>}
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
  const [products, setProducts] = useState<Product[]>([]);
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
        setProducts(catalogue);
        setServerCart(cart);
        setCommerceLive(true);
      })
      .catch(error => {
        console.error('Commerce connection failed.', error);
        setCommerceError('Store is temporarily unavailable. Please try again shortly.');
      });
  }, []);

  const cartItems = (serverCart?.lines || []).map(line => ({ product: line.product, qty: line.qty, lineId: line.lineId }));
  const cartCount = serverCart?.totalQuantity || 0;
  const subtotal = serverCart?.subtotal || 0;
  const freeDeliveryProgress = Math.min(100, (subtotal / 30) * 100);

  const addToCart = async (product:Product) => {
    if (!commerceLive) {
      setCommerceError('Store is temporarily unavailable');
      return;
    }
    try {
      setServerCart(await addProductToCart(product.id, 1));
      setCartOpen(true);
    } catch (error) {
      setCommerceError('We couldn’t add that item. Please try again.');
    }
  };

  const changeQty = async (lineId:string, currentQty:number, delta:number) => {
    const nextQty = currentQty + delta;
    try {
      setServerCart(nextQty <= 0 ? await removeCartLine(lineId) : await setCartLineQuantity(lineId, nextQty));
    } catch (error) {
      setCommerceError('We couldn’t update your bag. Please try again.');
    }
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

  const starterSetup = useMemo(() => {
    const ids = ['a1-tamper-48-57','a1-frothing-thermometer','a1-milk-jug-600','a1-shot-glass-60'];
    return ids.map(id => products.find(product => product.id === id)).filter(Boolean) as Product[];
  }, [products]);

  const addStarterSetup = async () => {
    for (const product of starterSetup) await addToCart(product);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Standard Dose home">STANDARD DOSE</a>
        <nav aria-label="Primary navigation">
          <button onClick={() => scrollToShop('All')}>Shop</button>
          <a href="#rituals">Categories</a>
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
        <div className="setup-copy"><h2>A practical espresso starter setup.</h2><p>Four useful pieces for dosing, steaming and serving at home.</p><button className="dark-cta" onClick={addStarterSetup}>Add starter setup</button></div>
        <div className="setup-stack">{starterSetup.map((p,i)=><div className={`setup-item setup-${i}`} key={p.variantId}><ProductVisual product={p}/><span>{p.name}</span></div>)}</div>
      </section>

      <section className="section value-strip">
        <div><strong>FREE DELIVERY OVER £30</strong><span>Standard UK delivery is £3.99.</span></div>
        <div><strong>HOME COFFEE GEAR</strong><span>Espresso, iced coffee, matcha and brew essentials.</span></div>
        <div><strong>FAIRER EVERYDAY PRICES</strong><span>Useful gear without the inflated coffee-shop markup.</span></div>
      </section>

      <section className="section deal" id="drops">
        <div><p className="eyebrow">UNDER £7</p><h2>Small upgrades.<br/>Small spend.</h2><p>Useful coffee extras priced below £7.</p></div>
        <button className="deal-orb" onClick={() => scrollToShop('Espresso')}><span>UNDER</span><strong>£7</strong><small>SHOP →</small></button>
      </section>

      <section className="section just-landed">
        <div className="section-head split"><div><p className="eyebrow">JUST LANDED</p><h2>New arrivals.</h2></div><button onClick={() => scrollToShop('All')}>Shop all →</button></div>
        <div className="landed-grid">{products.filter(p => p.tag.toLowerCase().includes('just landed')).slice(0,3).map(p => <ProductCard key={p.variantId} product={p} onView={setActiveProduct} onAdd={addToCart}/>)}</div>
      </section>

      <section className="section editorial">
        <div className="steel-panel"><div className="steel-disc"></div><div className="steel-line"></div></div>
        <div><h2>Simple tools for better coffee at home.</h2><p>Useful gear, sensible prices and things you’ll actually use.</p></div>
      </section>

      <footer><span>STANDARD DOSE™</span><span>HOME COFFEE, DIALED IN.</span></footer>

      {cartOpen && <>
        <button className="overlay" aria-label="Close bag" onClick={() => setCartOpen(false)}/>
        <aside className="cart-drawer">
          <div className="drawer-head"><div><span>YOUR BAG</span><strong>{cartCount} {cartCount === 1 ? 'ITEM':'ITEMS'}</strong></div><button onClick={() => setCartOpen(false)}>×</button></div>
          <div className="shipping-meter"><div><i style={{width:`${freeDeliveryProgress}%`}}/></div><span>{subtotal >= 30 ? 'You’ve unlocked free delivery.' : `${money(Math.max(0,30 - subtotal))} away from free delivery.`}</span></div>
          {commerceError && <div className="commerce-note">{commerceError}</div>}
          <div className="cart-lines">
            {cartItems.length === 0 && <div className="empty-cart"><h3>Your bag is empty.</h3><p>Browse the shop to get started.</p><button onClick={() => {setCartOpen(false); scrollToShop('All');}}>Shop products</button></div>}
            {cartItems.map(item => <div className="cart-line" key={item.lineId}><ProductVisual product={item.product}/><div><strong>{item.product.name}</strong><span>{money(item.product.price)}</span><div className="qty"><button onClick={() => changeQty(item.lineId,item.qty,-1)}>−</button><span>{item.qty}</span><button onClick={() => changeQty(item.lineId,item.qty,1)}>+</button></div></div></div>)}
          </div>
          {cartItems.length > 0 && <div className="cart-footer"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><button disabled>Checkout currently unavailable</button></div>}
        </aside>
      </>}

      {searchOpen && <div className="search-overlay">
        <div className="search-head"><span>SEARCH STANDARD DOSE</span><button onClick={() => {setSearchOpen(false); setQuery('');}}>×</button></div>
        <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search milk jugs, matcha, syrups…"/>
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
