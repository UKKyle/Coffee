import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const products = [
  { name: '58mm Puck Screen', price: '£5.95', tag: 'Best seller' },
  { name: 'Needle WDT Tool', price: '£9.95', tag: 'Dial-in essential' },
  { name: 'Magnetic Dosing Funnel', price: '£8.95', tag: 'Under £10' },
  { name: 'Stainless Dosing Cup', price: '£11.95', tag: 'Setup upgrade' },
];

const categories = [
  ['Espresso', 'Prep, pull, repeat.'],
  ['Iced', 'Glassware, syrups & cold brew.'],
  ['Matcha', 'Tools for a cleaner ritual.'],
  ['Coffee', 'Beans, filters & repeat orders.'],
];

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Dose Standard home">DOSE STANDARD</a>
        <nav aria-label="Primary navigation">
          <a href="#shop">Shop</a>
          <a href="#rituals">Rituals</a>
          <a href="#drops">Just landed</a>
        </nav>
        <button className="cart" type="button" aria-label={`Basket with ${cartCount} items`}>BAG <span>{cartCount}</span></button>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">HOME COFFEE, DIALED IN.</p>
          <h1>Make the ritual<br/>feel better.</h1>
          <p className="hero-sub">Tools, coffee and objects for the home barista.</p>
          <a className="cta" href="#shop">Shop the setup</a>
        </div>

        <div className="hero-media-shell">
          <video
            className="hero-video"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            poster="https://images.pexels.com/photos/6205575/pexels-photo-6205575.jpeg?auto=compress&cs=tinysrgb&w=2200&q=94"
            aria-label="Barista inserting and locking a portafilter into an espresso machine"
          >
            <source src="https://www.pexels.com/download/video/7487673/" type="video/mp4" />
          </video>
          <div className="hero-photo-fallback" aria-hidden="true" />
        </div>

        <div className="hero-vignette" />
        <div className="media-credit">REAL FOOTAGE · PEXELS / LOS MUERTOS CREW</div>
      </section>

      <section id="rituals" className="section rituals">
        <div className="section-head"><p className="eyebrow">SHOP BY RITUAL</p><h2>Start where you drink.</h2></div>
        <div className="ritual-grid">
          {categories.map(([title, copy], index) => (
            <a className="ritual-card" href="#shop" key={title}>
              <span className="ritual-index">0{index + 1}</span>
              <h3>{title}</h3><p>{copy}</p><span className="arrow">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section id="shop" className="section shop-section">
        <div className="section-head split"><div><p className="eyebrow">BEST SELLERS</p><h2>Small upgrades.<br/>Better coffee.</h2></div><a href="#shop">Shop all →</a></div>
        <div className="product-grid">
          {products.map((product, index) => (
            <article className="product-card" key={product.name}>
              <div className={`product-object shape-${index}`} aria-hidden="true"></div>
              <div className="product-meta"><span>{product.tag}</span><h3>{product.name}</h3><p>{product.price}</p></div>
              <button type="button" onClick={() => setCartCount(c => c + 1)}>Add +</button>
            </article>
          ))}
        </div>
      </section>

      <section className="section value-strip">
        <div><strong>FREE DELIVERY OVER £30</strong><span>Easy to build a setup, easy to come back.</span></div>
        <div><strong>UK-FIRST FULFILMENT</strong><span>Fast delivery is part of the product.</span></div>
        <div><strong>CURATED, NOT CROWDED</strong><span>Only tools worth a place on your counter.</span></div>
      </section>

      <section className="section deal" id="drops">
        <div><p className="eyebrow">THE £5 SHELF</p><h2>Good gear.<br/>No coffee tax.</h2><p>Small upgrades, rotating finds and the bits you should never have to overpay for.</p></div>
        <a className="deal-orb" href="#shop"><span>UNDER</span><strong>£5</strong><small>SHOP →</small></a>
      </section>

      <section className="section editorial">
        <div className="steel-panel"><div className="steel-disc"></div><div className="steel-line"></div></div>
        <div><p className="eyebrow">BUILT FOR THE RITUAL</p><h2>Your counter should work as good as it looks.</h2><p>Useful tools, tactile materials and coffee-station objects chosen to make everyday espresso feel more considered—without turning a simple setup into a luxury-tax exercise.</p></div>
      </section>

      <footer><span>DOSE STANDARD™</span><span>HOME COFFEE, DIALED IN.</span></footer>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
