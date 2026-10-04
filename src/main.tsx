import React, { useEffect, useMemo, useState } from 'react';
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

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const segment = (progress: number, start: number, end: number) => clamp((progress - start) / (end - start));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

function App() {
  const [progress, setProgress] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>('[data-hero]');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const total = Math.max(1, hero.offsetHeight - window.innerHeight);
      const travelled = Math.min(total, Math.max(0, -rect.top));
      setProgress(travelled / total);
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, []);

  const portafilterMotion = useMemo(() => {
    const approach = ease(segment(progress, 0.08, 0.40));
    const insert = ease(segment(progress, 0.40, 0.57));
    const twist = ease(segment(progress, 0.57, 0.72));
    const settle = ease(segment(progress, 0.72, 0.79));

    const x = 330 - approach * 250 - insert * 80;
    const y = 72 - approach * 34 - insert * 38 + settle * 2;
    const rotation = -14 + twist * 18 - settle * 1.5;
    const scale = 0.965 + insert * 0.035;
    return { x, y, rotation, scale };
  }, [progress]);

  const extraction = ease(segment(progress, 0.73, 0.91));
  const reveal = ease(segment(progress, 0.82, 1));
  const copyFade = 1 - ease(segment(progress, 0.10, 0.42));
  const lockGlow = segment(progress, 0.64, 0.78) * (1 - segment(progress, 0.78, 0.88));

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

      <section id="top" data-hero className="hero-scroll">
        <div className="hero-sticky">
          <div className="hero-copy" style={{ opacity: copyFade, transform: `translateY(${-18 * (1 - copyFade)}px)` }}>
            <p className="eyebrow">HOME COFFEE, DIALED IN.</p>
            <h1>Make the ritual<br/>feel better.</h1>
            <p className="hero-sub">Tools, coffee and objects for the home barista.</p>
            <a className="cta" href="#shop">Shop the setup</a>
          </div>

          <div className="machine-wrap" aria-label="Close-up stainless espresso machine with scroll-controlled portafilter">
            <div className="machine-shadow" />
            <div className="machine-body">
              <div className="steel-brush" />
              <div className="machine-edge" />
              <div className="machine-brandmark">DS / 9 BAR</div>
              <div className="status-led" />
              <div className="steam-knob"><span /></div>
              <div className="group-assembly">
                <div className="group-collar"><span className="group-slot group-slot-a"/><span className="group-slot group-slot-b"/></div>
                <div className="group-ring" />
                <div className="group-face"><span className="shower-screen" /></div>
                <span className="group-bolt bolt-a"/><span className="group-bolt bolt-b"/>
              </div>
              <div className="tray-shadow" />
              <div className="drip-tray"><span /></div>
              <div className="cup" style={{ opacity: extraction, transform: `translateY(${18 - extraction * 18}px) scale(${0.98 + extraction * 0.02})` }}>
                <div className="crema" style={{ height: `${24 + extraction * 18}%` }} />
                <div className="espresso" style={{ height: `${Math.min(78, extraction * 78)}%` }} />
              </div>
              <div className="stream stream-left" style={{ opacity: extraction > 0.08 ? extraction : 0, transform: `scaleY(${extraction})` }} />
              <div className="stream stream-right" style={{ opacity: extraction > 0.12 ? extraction * .82 : 0, transform: `scaleY(${extraction * .96})` }} />
            </div>

            <div
              className="portafilter"
              style={{
                transform: `translate3d(${portafilterMotion.x}px, ${portafilterMotion.y}px, 0) rotate(${portafilterMotion.rotation}deg) scale(${portafilterMotion.scale})`,
              }}
            >
              <div className="pf-basket"><span className="pf-rim"/><span className="pf-lug lug-top"/><span className="pf-lug lug-bottom"/></div>
              <div className="pf-neck" />
              <div className="pf-handle"><span className="pf-cap" /></div>
            </div>

            <div className="lock-pulse" style={{ opacity: lockGlow }} />
            <div className="lock-caption" style={{ opacity: lockGlow }}>INSERT · TWIST · LOCK</div>
          </div>

          <div className="hero-reveal" style={{ opacity: reveal, transform: `translateY(${18 - reveal * 18}px)` }}>
            <span>ESPRESSO</span><span>ICED</span><span>MATCHA</span><span>COFFEE</span>
          </div>
          <div className="scroll-hint" style={{ opacity: progress < 0.08 ? 1 : 0 }}>SCROLL TO LOCK</div>
        </div>
      </section>

      <section id="rituals" className="section rituals">
        <div className="section-head"><p className="eyebrow">SHOP BY RITUAL</p><h2>Start where you drink.</h2></div>
        <div className="ritual-grid">
          {categories.map(([title, copy]) => (
            <a className="ritual-card" href="#shop" key={title}>
              <span className="ritual-index">0{categories.findIndex(c => c[0] === title) + 1}</span>
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
