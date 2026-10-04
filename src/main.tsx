import React, { useEffect, useRef, useState } from 'react';
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

function App() {
  const [progress, setProgress] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.82;
      video.currentTime = 0;
    }

    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>('[data-hero]');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const total = Math.max(1, hero.offsetHeight - window.innerHeight);
      const travelled = Math.min(total, Math.max(0, -rect.top));
      const next = travelled / total;
      setProgress(next);

      const media = videoRef.current;
      if (!media) return;

      if (next > 0.055 && next < 0.84) {
        if (!hasStartedRef.current) {
          hasStartedRef.current = true;
          media.currentTime = Math.min(0.25, Number.isFinite(media.duration) ? media.duration * 0.03 : 0.25);
        }
        if (media.paused) media.play().catch(() => undefined);
      } else if (next >= 0.84) {
        if (!media.paused) media.pause();
      } else if (next <= 0.02) {
        if (!media.paused) media.pause();
        if (hasStartedRef.current) {
          media.currentTime = 0;
          hasStartedRef.current = false;
        }
      }
    };

    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, []);

  const copyOpacity = 1 - clamp((progress - 0.10) / 0.30);
  const reveal = clamp((progress - 0.74) / 0.24);
  const cameraScale = 1 + progress * 0.018;
  const cameraX = progress * -1.2;
  const cameraY = progress * -0.8;

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
          <div className="hero-media-shell">
            <div className="hero-media" style={{ transform: `translate3d(${cameraX}%, ${cameraY}%, 0) scale(${cameraScale})` }}>
              <video
                ref={videoRef}
                className="hero-video"
                muted
                playsInline
                preload="auto"
                poster="https://images.pexels.com/photos/28835892/pexels-photo-28835892/free-photo-of-close-up-of-portafilter-in-espresso-machine.jpeg?auto=compress&cs=tinysrgb&w=2400&q=92"
                aria-label="Close-up footage of a portafilter being fitted to an espresso machine"
              >
                <source src="https://www.pexels.com/download/video/7487673/" type="video/mp4" />
              </video>
              <div className="hero-photo-fallback" aria-hidden="true" />
            </div>
          </div>

          <div className="hero-vignette" />
          <div className="hero-grain" />

          <div className="hero-copy" style={{ opacity: copyOpacity, transform: `translateY(${(1 - copyOpacity) * -16}px)` }}>
            <p className="eyebrow">HOME COFFEE, DIALED IN.</p>
            <h1>Make the ritual<br/>feel better.</h1>
            <p className="hero-sub">Tools, coffee and objects for the home barista.</p>
            <a className="cta" href="#shop">Shop the setup</a>
          </div>

          <div className="hero-status" style={{ opacity: progress > 0.12 && progress < 0.76 ? 1 : 0 }}>
            <span>01</span>
            <div className="status-line"><i style={{ transform: `scaleX(${clamp(progress / 0.76)})` }} /></div>
            <span>DIAL IN</span>
          </div>

          <div className="hero-reveal" style={{ opacity: reveal, transform: `translateY(${16 - reveal * 16}px)` }}>
            <span>ESPRESSO</span><span>ICED</span><span>MATCHA</span><span>COFFEE</span>
          </div>
          <div className="scroll-hint" style={{ opacity: progress < 0.07 ? 1 : 0 }}>SCROLL TO DIAL IN</div>
          <div className="media-credit">REAL FOOTAGE · PEXELS / LOS MUERTOS CREW</div>
        </div>
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
