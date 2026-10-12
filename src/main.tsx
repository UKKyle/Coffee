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

const productBrand = (product:Product) => {
  const name = product.name.toLowerCase();
  if (name.includes('cafelat')) return 'Cafelat';
  if (name.includes('simply')) return 'Simply';
  if (name.includes('perfect ted')) return 'Perfect Ted';
  if (name.includes('planet java')) return 'Planet Java';
  if (name.includes('zuma')) return 'Zuma';
  if (name.includes('java caffe')) return 'Java Caffe';
  return 'Standard Dose';
};

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
        <span className="product-brand">{productBrand(product)}</span>
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
  const [sortMode, setSortMode] = useState('featured');

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
    const list = products.filter(product => {
      const categoryMatch = activeCategory === 'All' || product.category === activeCategory;
      const searchMatch = !q || `${product.name} ${product.category} ${product.tag} ${productBrand(product)}`.toLowerCase().includes(q);
      return categoryMatch && searchMatch;
    });
    if (sortMode === 'price-low') return [...list].sort((a,b) => a.price - b.price);
    if (sortMode === 'price-high') return [...list].sort((a,b) => b.price - a.price);
    if (sortMode === 'name') return [...list].sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }, [products, query, activeCategory, sortMode]);

  const brandNames = useMemo(() => Array.from(new Set(products.map(productBrand))).filter(Boolean), [products]);
  const categoryCounts = useMemo(() => Object.fromEntries(categories.map(([title]) => [title, products.filter(p => p.category === title).length])), [products]);

  const scrollToShop = (category:string) => {
    setActiveCategory(category);
    setMenuOpen(false);
    requestAnimationFrame(() => document.querySelector('#shop')?.scrollIntoView({behavior:'smooth'}));
  };

  const starterSetup = useMemo(() => {
    const ids = ['a1-tamper-48-57','a1-frothing-thermometer','a1-milk-jug-600','a1-shot-glass-60'];
    return ids.map(id => products.find(product => product.id === id)).filter(Boolean) as Product[];
  }, [products]);

  const editorialProducts = useMemo(() => {
    const ids = ['a1-tamper-48-57','a1-shot-glass-60','a1-milk-jug-600'];
    return ids.map(id => products.find(product => product.id === id)).filter(Boolean) as Product[];
  }, [products]);

  const addStarterSetup = async () => {
    for (const product of starterSetup) await addToCart(product);
  };

  return (
    <main>
      <div className="utility-bar" aria-label="Free UK delivery over £30">
        <div className="utility-track">
          {[0,1].map(group => (
            <div className="utility-group" aria-hidden={group === 1} key={group}>
              <span>FREE UK DELIVERY OVER £30</span>
              <span>HOME COFFEE, DIALED IN.</span>
            </div>
          ))}
        </div>
      </div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Standard Dose home"><strong>STANDARD DOSE</strong><small>COFFEE</small></a>
        <nav aria-label="Primary navigation">
          <button onClick={() => scrollToShop('All')}>Shop all</button>
          <button onClick={() => scrollToShop('Espresso')}>Espresso</button>
          <button onClick={() => scrollToShop('Coffee')}>Coffee</button>
          <button onClick={() => scrollToShop('Matcha')}>Matcha</button>
          <button onClick={() => scrollToShop('Iced')}>Iced</button>
          <a href="#drops">Just landed</a>
        </nav>
        <div className="header-actions">
          <button className="header-search" onClick={() => setSearchOpen(true)} aria-label="Search products"><span>Search</span><b>⌕</b></button>
          <button className="mobile-menu-button" onClick={() => setMenuOpen(true)}>Menu</button>
          <button className="cart" type="button" onClick={() => setCartOpen(true)} aria-label={`Basket with ${cartCount} items`}>BAG <span>{cartCount}</span></button>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="hero-kicker">ESPRESSO · COFFEE · MATCHA · ICED</p>
          <h1>Better coffee,<br/>made at home.</h1>
          <p className="hero-sub">Shop practical coffee gear, brewing tools and everyday essentials chosen for home baristas.</p>
          <div className="hero-actions">
            <button className="cta" onClick={() => scrollToShop('All')}>Shop all coffee gear</button>
          </div>
        </div>
        <div className="hero-media-shell">
          <video className="hero-video" autoPlay muted playsInline loop preload="auto" poster="https://images.pexels.com/photos/6205575/pexels-photo-6205575.jpeg?auto=compress&cs=tinysrgb&w=2200&q=94" aria-label="Barista inserting and locking a portafilter into an espresso machine">
            <source src="https://www.pexels.com/download/video/7487673/" type="video/mp4" />
          </video>
          <div className="hero-photo-fallback" aria-hidden="true" />
        </div>
        <div className="hero-vignette" />
      </section>

      <section className="hero-trust-bar" aria-label="Why shop Standard Dose">
        <span><b>01</b> Curated for home baristas</span>
        <span><b>02</b> Clear stock availability</span>
        <span><b>03</b> UK delivery from £3.99</span>
      </section>

      <section id="rituals" className="section department-section">
        <div className="retail-section-head">
          <div><p className="eyebrow">SHOP BY CATEGORY</p><h2>Find what you need.</h2></div>
          <button onClick={() => scrollToShop('All')}>Shop all products →</button>
        </div>
        <div className="department-grid">
          {categories.map(([title, copy]) => (
            <button className="department-card" onClick={() => scrollToShop(title)} key={title}>
              <span><strong>{title}</strong><small>{copy}</small></span>
              <b>{categoryCounts[title] || 0} products</b>
              <i>→</i>
            </button>
          ))}
        </div>
      </section>

      <section className="brand-strip section">
        <div className="brand-strip-head"><span>BRANDS IN THE SHOP</span><small>Current live catalogue</small></div>
        <div className="brand-list">{brandNames.map(brand => <span key={brand}>{brand}</span>)}</div>
      </section>

      <section id="shop" className="section shop-section">
        <div className="catalogue-head">
          <div><p className="eyebrow">SHOP</p><h2>Coffee gear.</h2><p>{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}</p></div>
          <button className="catalogue-search" onClick={() => setSearchOpen(true)}>Search products</button>
        </div>

        <div className="catalogue-toolbar">
          <div className="category-tabs">{['All','Espresso','Iced','Matcha','Coffee','Setup'].map(category => <button key={category} className={activeCategory === category ? 'active':''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
          <label className="sort-control"><span>Sort</span><select value={sortMode} onChange={e => setSortMode(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A–Z</option></select></label>
        </div>

        <div className="product-grid">{filteredProducts.map(product => <ProductCard key={product.variantId} product={product} onView={setActiveProduct} onAdd={addToCart}/>)}</div>
      </section>

      <section className="section retail-feature">
        <div>
          <p className="eyebrow">START WITH THE ESSENTIALS</p>
          <h2>Everyday espresso tools.</h2>
          <p>A straightforward edit of practical tools for dosing, steaming and serving coffee at home.</p>
          <button className="dark-cta" onClick={() => scrollToShop('Espresso')}>Shop espresso</button>
        </div>
        <div className="feature-products">{starterSetup.slice(0,3).map(product => <ProductCard key={product.variantId} product={product} onView={setActiveProduct} onAdd={addToCart}/>)}</div>
      </section>

      <section className="section just-landed" id="drops">
        <div className="retail-section-head">
          <div><p className="eyebrow">JUST LANDED</p><h2>New to the shop.</h2></div>
          <button onClick={() => scrollToShop('All')}>View all →</button>
        </div>
        <div className="landed-grid">{products.filter(p => p.tag.toLowerCase().includes('just landed')).slice(0,4).map(p => <ProductCard key={p.variantId} product={p} onView={setActiveProduct} onAdd={addToCart}/>)}</div>
      </section>

      <section className="service-grid section">
        <div><strong>Delivery</strong><span>£3.99 standard UK delivery. Free when you spend £30.</span></div>
        <div><strong>Product-led range</strong><span>Focused on useful home coffee gear rather than endless filler.</span></div>
        <div><strong>Clear availability</strong><span>Product pages show whether an item is available before you add it.</span></div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><strong>STANDARD DOSE</strong><p>Home coffee, dialed in.</p></div>
        <div><strong>SHOP</strong><button onClick={() => scrollToShop('All')}>All products</button><button onClick={() => scrollToShop('Espresso')}>Espresso</button><button onClick={() => scrollToShop('Coffee')}>Coffee</button><button onClick={() => scrollToShop('Matcha')}>Matcha</button></div>
        <div><strong>DISCOVER</strong><button onClick={() => document.querySelector('#rituals')?.scrollIntoView({behavior:'smooth'})}>Categories</button><button onClick={() => document.querySelector('#drops')?.scrollIntoView({behavior:'smooth'})}>Just landed</button><button onClick={() => setSearchOpen(true)}>Search</button></div>
        <div className="footer-meta"><strong>STANDARD DOSE COFFEE</strong><span>UK online coffee retailer</span><span>© 2026 Standard Dose</span></div>
      </footer>

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
