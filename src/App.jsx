import { useState, useEffect, useRef } from 'react'
import MENU_DATA from './menu-data.js'

// ==================== Decorative SVG ====================

function PapelPicado() {
  const colors = ["#E94B7B", "#F2A60C", "#2E7D4F", "#C8102E", "#0E7BB8", "#E94B7B", "#F2A60C", "#2E7D4F"];
  return (
    <svg className="papel-picado" viewBox="0 0 1200 70" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 6 Q 150 26 300 6 T 600 6 T 900 6 T 1200 6" fill="none" stroke="#1F1A17" strokeWidth="1.4" />
      {colors.map((c, i) => {
        const x = i * 150 + 12;
        return (
          <g key={i} transform={`translate(${x}, 8)`}>
            <path d={`M0 0 L126 0 L120 50 L6 50 Z`} fill={c} />
            <circle cx="63" cy="18" r="6" fill="#F7EFE0" />
            <circle cx="40" cy="32" r="4" fill="#F7EFE0" />
            <circle cx="86" cy="32" r="4" fill="#F7EFE0" />
            <circle cx="22" cy="18" r="3" fill="#F7EFE0" />
            <circle cx="104" cy="18" r="3" fill="#F7EFE0" />
            <rect x="58" y="36" width="10" height="8" fill="#F7EFE0" />
            <path d="M6 50 L120 50" stroke="#1F1A17" strokeWidth="0.5" opacity="0.4" />
          </g>
        );
      })}
    </svg>
  );
}

function SerapeStripes({ height = 18 }) {
  return (
    <div className="serape-band" style={{ height }} aria-hidden="true">
      <div className="serape-inner" />
    </div>
  );
}

function StarBurst({ size = 60, color = "#F2A60C" }) {
  const points = [];
  const N = 16;
  for (let i = 0; i < N * 2; i++) {
    const r = i % 2 === 0 ? size / 2 : size / 4;
    const a = (i / (N * 2)) * Math.PI * 2 - Math.PI / 2;
    points.push(`${50 + Math.cos(a) * r * 100 / size},${50 + Math.sin(a) * r * 100 / size}`);
  }
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <polygon points={points.join(" ")} fill={color} />
    </svg>
  );
}

function CornerOrnament({ flip = false }) {
  return (
    <svg viewBox="0 0 80 80" className={`corner-ornament ${flip ? "flip" : ""}`} aria-hidden="true">
      <path d="M5 5 Q 5 40 40 40 M 5 5 L 25 5 M 5 5 L 5 25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="42" cy="42" r="2.5" fill="currentColor" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}

// ==================== Nav ====================

function Nav({ active, onNavigate, onReserve }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { id: "home", label: "Home / Inicio" },
    { id: "menu", label: "Menu / Menú" },
    { id: "about", label: "About / Nosotros" },
    { id: "visit", label: "Visit / Visítanos" },
  ];

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#home" className="brand" onClick={(e) => { e.preventDefault(); onNavigate("home"); }}>
          <img src="/assets/logo.jpg" alt="El Costeño Taqueria" />
          <span className="brand-text">
            <span className="brand-line-1">El Costeño</span>
            <span className="brand-line-2">TAQUERIA · CHICAGO</span>
          </span>
        </a>

        <button className="mobile-toggle" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>

        <div className={`nav-links ${mobileOpen ? "open" : ""}`}>
          {links.map(l => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? "active" : ""}
              onClick={(e) => { e.preventDefault(); onNavigate(l.id); setMobileOpen(false); }}
            >
              {l.label}
            </a>
          ))}
          <button className="nav-cta" onClick={() => { onReserve(); setMobileOpen(false); }}>
            Order Now
          </button>
        </div>
      </div>
    </nav>
  );
}

// ==================== Hero ====================

function Hero({ onScrollToMenu, onReserve }) {
  return (
    <section id="home" className="hero">
      <PapelPicado />
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-stripes" />
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span>★</span> From the heart of Mexican cooking <span>★</span>
          </div>
          <h1>
            <span className="hero-line-es">Welcome</span>
            <span className="hero-line-en">to the Taquería</span>
          </h1>
          <p className="hero-sub">
            <span className="en">Traditional flavors from Mexico's Pacific coast, hand-made every day in Chicago's Southwest Side.</span>
            <span className="es">Sabores tradicionales del Pacífico mexicano, hechos a mano todos los días en el corazón del Southwest Side de Chicago.</span>
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onReserve}>
              Order Now
              <span className="btn-sub">Pedir ahora · Delivery &amp; Pickup</span>
            </button>
            <button className="btn-secondary" onClick={onScrollToMenu}>
              View Menu →
              <span className="btn-sub">Ver el menú</span>
            </button>
          </div>

          <div className="hero-meta">
            <div>
              <div className="meta-label">Monday — Sunday</div>
              <div className="meta-value">8 AM – 9 PM</div>
            </div>
            <div className="meta-divider" />
            <div>
              <div className="meta-label">Call · Llámanos</div>
              <div className="meta-value">773 · 335 · 1703</div>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-photo-stack">
            <div className="hero-photo hp1">
              <img src="/assets/quesadilla.jpg" alt="Quesadilla con guacamole" />
              <div className="hero-photo-tag">Quesadilla de asada</div>
            </div>
            <div className="hero-photo hp2">
              <img src="/assets/carne.jpg" alt="Pollo con mole" />
              <div className="hero-photo-tag">Pollo con mole</div>
            </div>
            <div className="hero-photo hp3">
              <img src="/assets/drinks.jpg" alt="Soda Preparada" />
              <div className="hero-photo-tag">Soda Preparada</div>
              <div className="hero-photo-desc">Jarritos Flavors rimmed with chamoy &amp; tajín, ice-cold, sweet, spicy, and bursting with flavor.</div>
            </div>
            <StarBurst size={70} color="#F2A60C" />
          </div>
        </div>
      </div>

      <SerapeStripes height={22} />
    </section>
  );
}

// ==================== Menu ====================

function MenuItem({ item }) {
  return (
    <article className="menu-item">
      <div className="mi-head">
        <h4>{item.name}</h4>
        <span className="mi-dots" aria-hidden="true" />
        <span className="mi-price">${item.price}</span>
      </div>
      <p className="mi-desc en">{item.en}</p>
      <p className="mi-desc es">{item.es}</p>
    </article>
  );
}

function Menu({ menuRef }) {
  const [active, setActive] = useState("breakfast");
  const [tabFade, setTabFade] = useState({ left: false, right: true });
  const sectionRefs = useRef({});
  const tabsRef = useRef(null);
  const tabRefs = useRef({});

  useEffect(() => {
    const handler = () => {
      const offset = 220;
      let current = active;
      for (const cat of MENU_DATA) {
        const el = sectionRefs.current[cat.id];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top - offset < 0) current = cat.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [active]);

  // Keep the active tab centered in the tab bar whenever it changes
  useEffect(() => {
    const el = tabRefs.current[active];
    const container = tabsRef.current;
    if (!el || !container) return;
    const target = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
    container.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  // Track scroll position to show/hide left & right fade indicators
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setTabFade({
        left: scrollLeft > 4,
        right: scrollLeft < scrollWidth - clientWidth - 4,
      });
    };
    update();
    container.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      container.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToCat = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 180;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="menu" className="menu" ref={menuRef}>
      <div className="menu-header">
        <CornerOrnament />
        <div className="menu-eyebrow">— Our Menu · Nuestro Menú —</div>
        <h2>Traditional,<br/><em>straight from Mexico.</em></h2>
        <p className="menu-sub">
          <span className="en">Family recipes, authentic flavors and fresh ingredients.</span>
          <span className="es">Recetas familiares, sabores auténticos e ingredientes frescos.</span>
        </p>
        <CornerOrnament flip />
      </div>

      <div className="menu-tabs-wrap">
        {tabFade.left && <div className="tabs-fade tabs-fade-left" aria-hidden="true" />}
        <div className="menu-tabs" ref={tabsRef}>
          {MENU_DATA.map(cat => (
            <button
              key={cat.id}
              ref={el => (tabRefs.current[cat.id] = el)}
              className={`menu-tab ${active === cat.id ? "active" : ""}`}
              onClick={() => scrollToCat(cat.id)}
            >
              <span className="tab-es">{cat.es}</span>
              <span className="tab-en">{cat.en}</span>
            </button>
          ))}
        </div>
        {tabFade.right && <div className="tabs-fade tabs-fade-right" aria-hidden="true" />}
      </div>

      <div className="menu-body">
        {MENU_DATA.map((cat, i) => (
          <div
            key={cat.id}
            className="menu-category"
            ref={el => (sectionRefs.current[cat.id] = el)}
          >
            <div className="cat-header">
              <div className="cat-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="cat-title-block">
                <h3>
                  <span className="cat-es">{cat.en}</span>
                  <span className="cat-en">/ {cat.es}</span>
                </h3>
                {cat.note && <p className="cat-note">{cat.note}</p>}
              </div>
            </div>
            <div className="cat-items">
              {cat.items.map((item, j) => (
                <MenuItem key={j} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <SerapeStripes height={22} />
    </section>
  );
}

// ==================== About ====================

function About() {
  return (
    <section id="about" className="about">
      <div className="about-grid">
        <div className="about-images">
          <div className="about-img main">
            <img src="/assets/mole.jpg" alt="Mole plate" />
          </div>
          <div className="about-img secondary">
            <img src="/assets/drinks.jpg" alt="Michelada and Jarritos" />
          </div>
        </div>

        <div className="about-copy">
          <div className="about-eyebrow">— Our Story · Nuestra Historia —</div>
          <h2>From Central Mexico to <em>Pulaski Road</em>.</h2>

          <div className="about-text">
            <p className="en">
              The Serna family opened Taquería El Costeño with a simple dream: bring the flavors
              of central Mexico to Chicago. We make our salsas from scratch, toast guajillo chiles on a
              comal, and bring traditional flavors to all our foods.
            </p>
            <p className="es">
              La familia Serna abrió Taquería El Costeño con un sueño sencillo: traer los sabores
              del puerto a Chicago. Hacemos nuestras salsas a mano, tostamos chiles guajillos en un comal, 
              y traemos sabores tradicionales a toda nuestra comida.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

// ==================== Visit ====================

function Visit() {
  return (
    <section id="visit" className="visit">
      <SerapeStripes height={22} />
      <div className="visit-inner">
        <div className="visit-eyebrow">— Find Us · Visítanos —</div>
        <h2>Come eat<br/><em>with us.</em></h2>

        <div className="visit-grid">
          <div className="visit-card">
            <div className="vc-label">Address · Dirección</div>
            <div className="vc-value">8121 S Pulaski Rd<br/>Chicago, IL 60652</div>

          </div>

          <div className="visit-card">
            <div className="vc-label">Phone · Teléfono</div>
            <div className="vc-value">(773) 335-1703</div>
            <a className="vc-link" href="tel:7733351703">
              Call now / Llamar →
            </a>
          </div>

          <div className="visit-card">
            <div className="vc-label">Hours · Horario</div>
            <div className="vc-hours">
              <div><span>Mon – Sun</span><span>8 AM – 9 PM</span></div>
            </div>
          </div>

          <div className="visit-card">
            <div className="vc-label">Follow · Síguenos</div>
            <div className="vc-value">@_el_costeno_2</div>
            <div className="vc-socials">
              <a href="https://www.instagram.com/_el_costeno_2/" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
              <a href="https://www.facebook.com/profile.php?id=61579675301764" target="_blank" rel="noreferrer" aria-label="Facebook">FB</a>
            </div>
          </div>
        </div>

        <div className="visit-map" aria-label="Map of Taqueria El Costeño">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2976.8586063685925!2d-87.72386042258834!3d41.745142571256636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e31a128e8bc41%3A0xec444f5cb394406e!2sTaqueria%20Coste%C3%B1o%202!5e0!3m2!1sen!2sus!4v1779311731367!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Taqueria El Costeño location map"
          />
        </div>
      </div>
    </section>
  );
}

// ==================== Footer ====================

function Footer() {
  return (
    <footer className="footer">
      <SerapeStripes height={14} />
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/assets/logo.jpg" alt="" />
          <div>
            <div className="footer-brand-name">Taquería El Costeño</div>
            <div className="footer-brand-sub">Authentic Mexican kitchen · Auténtica cocina mexicana</div>
          </div>
        </div>
        <div className="footer-meta">
          <div>8121 S Pulaski Rd · Chicago, IL</div>
          <div>(773) 335-1703 · Open every day</div>
          <div className="footer-fine">© {new Date().getFullYear()} El Costeño Taquería · Made with love in Chicago</div>
        </div>
      </div>
    </footer>
  );
}

// ==================== Order Now Modal ====================

const POSTMATES_URL = "https://www.postmates.com/store/el-costeno-2-8121-s-pulaski-rd/opr8gOJgRqWlmewgVOoUPg?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas&rwg_token=AFd1xnHMYcfp3BLx_pQb8r_VkaDgPqURe6oknOAKzIOrGJwFzuQWaw8xNRSd8Z4S9_FxTIT5sjR11FVM2LxHVEw_OML4J71cSQ%3D%3D";
const UBEREATS_URL = "https://www.ubereats.com/store/el-costeno-2-8121-s-pulaski-rd/opr8gOJgRqWlmewgVOoUPg?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas&rwg_token=AFd1xnHbvo2z_9v9_OJW3BnV4GwbVI4TvKIBhm_kFG7uwr4-1hXqmqDMXvfvEIrSIRvqe4pwO1a7ZDz3k0sJJEMQdojFcBvEYg%3D%3D";

function OrderModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal order-now-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <SerapeStripes height={10} />
        <div className="modal-inner">
          <div className="modal-eyebrow">— Order Now · Pedir ahora —</div>
          <h3>Ready to eat?<br/><em>Pickup or delivery.</em></h3>
          <p className="call-intro">
            Order through your favorite app for pickup or delivery — or call us directly.<br/>
            <em>Pide a través de tu app favorita para llevar o a domicilio, o llámanos directo.</em>
          </p>

          <div className="delivery-platforms">
            <a
              className="platform-card platform-postmates"
              href={POSTMATES_URL}
              target="_blank"
              rel="noreferrer"
            >
              <div className="platform-logo">
                <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 2.5a11.5 11.5 0 1 1 0 23 11.5 11.5 0 0 1 0-23zm-3.5 6v11h2.5v-4h2c2.21 0 4-1.79 4-4s-1.79-3-4-3h-4.5zm2.5 2h2c.828 0 1.5.448 1.5 1s-.672 1.5-1.5 1.5H15v-2.5z"/></svg>
              </div>
              <div className="platform-name">Postmates</div>
              <div className="platform-cta">Order Now →</div>
            </a>

            <a
              className="platform-card platform-ubereats"
              href={UBEREATS_URL}
              target="_blank"
              rel="noreferrer"
            >
              <div className="platform-logo">
                <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm-4 8h2.5v6.5a2 2 0 0 0 4 0V10H21v6.5a4.5 4.5 0 0 1-9 0V10z"/></svg>
              </div>
              <div className="platform-name">Uber Eats</div>
              <div className="platform-cta">Order Now →</div>
            </a>
          </div>

          <div className="or-divider"><span>— or call us to order —</span></div>

          <a className="phone-card phone-card-sm" href="tel:7733351703">
            <div className="phone-label">Call us · Llámanos</div>
            <div className="phone-number">(773) 335 · 1703</div>
            <div className="phone-cta">Tap to call →</div>
          </a>

          <button className="btn-primary full" onClick={onClose}>Close / Cerrar</button>
        </div>
      </div>
    </div>
  );
}

// ==================== Root App ====================

function App() {
  const [active, setActive] = useState("home");
  const [modalOpen, setModalOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handler = () => {
      const sections = ["home", "menu", "about", "visit"];
      const offset = 200;
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset < 0) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <Nav active={active} onNavigate={navigate} onReserve={() => setModalOpen(true)} />
      <Hero
        onScrollToMenu={() => navigate("menu")}
        onReserve={() => setModalOpen(true)}
      />
      <Menu menuRef={menuRef} />
      <About />
      <Visit />
      <Footer />
      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default App
