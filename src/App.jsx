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
            Call to Order
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
              Call to Order
              <span className="btn-sub">Ordenar por teléfono</span>
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
  const sectionRefs = useRef({});

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
        <h2>Hand-made,<br/><em>like at home.</em></h2>
        <p className="menu-sub">
          <span className="en">Family recipes from the coast, masa ground each morning, salsas made in the molcajete.</span>
          <span className="es">Recetas familiares de la costa, masa molida cada mañana, salsas hechas en molcajete.</span>
        </p>
        <CornerOrnament flip />
      </div>

      <div className="menu-tabs-wrap">
        <div className="menu-tabs">
          {MENU_DATA.map(cat => (
            <button
              key={cat.id}
              className={`menu-tab ${active === cat.id ? "active" : ""}`}
              onClick={() => scrollToCat(cat.id)}
            >
              <span className="tab-es">{cat.es}</span>
              <span className="tab-en">{cat.en}</span>
            </button>
          ))}
        </div>
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
          <h2>From the coast of Guerrero to <em>Pulaski Road</em>.</h2>

          <div className="about-text">
            <p className="en">
              The Hernández family opened Taquería El Costeño with a simple dream: bring the flavors
              of the Pacific coast to Chicago. We grind our masa in-house, toast guajillo chiles on a
              clay comal, and pound every salsa in the molcajete — just like in the village market.
            </p>
            <p className="es">
              La familia Hernández abrió Taquería El Costeño con un sueño sencillo: traer los sabores
              del puerto a Chicago. La masa se muele en casa, el chile guajillo se tuesta en comal, y
              cada salsa nace en el molcajete — como en el mercado del pueblo.
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

// ==================== Call to Order Modal ====================

function OrderModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal call-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <SerapeStripes height={10} />
        <div className="modal-inner">
          <div className="modal-eyebrow">— Call to Order · Ordenar por teléfono —</div>
          <h3>Give us a ring,<br/><em>we'll take care of you.</em></h3>
          <p className="call-intro">
            Pickup orders are taken over the phone. Our team will confirm your order, give you a pickup time,
            and have everything ready when you arrive.<br/>
            <em>Los pedidos para llevar se toman por teléfono. Te confirmamos tu pedido y te decimos cuándo recogerlo.</em>
          </p>

          <a className="phone-card" href="tel:7733351703">
            <div className="phone-label">Call us · Llámanos</div>
            <div className="phone-number">(773) 335 · 1703</div>
            <div className="phone-cta">Tap to call →</div>
          </a>

          <div className="call-hours">
            <div className="ch-row"><span>Mon – Sun</span><span>8 AM – 9 PM</span></div>
          </div>

          <p className="call-foot">
            Prefer to dine in? Just walk in — no reservation needed.<br/>
            <em>¿Prefieres comer aquí? Pasa cuando quieras, sin reservación.</em>
          </p>

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
