import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Menu,
  X,
  MapPin,
} from 'lucide-react';
import restaurantData from './content/restaurant.json';
import { homeImages } from './content/home';
import { telephoneUrl } from './lib/links';
import type { RestaurantContent } from './types';
import { MenuSection } from './components/MenuSection';
import { BranchesSection } from './components/BranchesSection';

const content: RestaurantContent = restaurantData;
const featured = content.categories
  .flatMap((category) => category.items)
  .filter((item) => item.featured)
  .slice(0, 3);
const navSections = [
  { id: 'menu', label: 'Our menu' },
  { id: 'the-crunch', label: 'Kremes & sambal' },
  { id: 'branches', label: 'Find a branch' },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand${footer ? ' brand-footer' : ''}`}
      href="#home"
      aria-label="Ayam Kremes by Sarang home"
    >
      <img
        className="brand-logo"
        src="/images/logo.png"
        alt=""
        width="62"
        height="62"
      />
      <span className="brand-wordmark">
        <span className="brand-name">
          ayam kremes<span className="brand-dot">.</span>
        </span>
        <span className="brand-signature">by Sarang</span>
      </span>
    </a>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  useEffect(() => {
    const sections = [
      ...document.querySelectorAll<HTMLElement>('main > section[id]'),
    ];
    const update = () => {
      const line = Math.min(window.innerHeight * 0.3, 220);
      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= line)
        .at(-1);
      setActive(current?.id ?? 'home');
    };
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        update();
        frame = 0;
      });
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
        <nav
          id="main-navigation"
          className={`main-navigation${open ? ' is-open' : ''}`}
          aria-label="Main navigation"
        >
          {navSections.map((section) => (
            <a
              key={section.id}
              className={section.id === 'branches' ? 'nav-branch' : undefined}
              href={`#${section.id}`}
              aria-current={active === section.id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {section.id === 'branches' && (
                <MapPin size={16} aria-hidden="true" />
              )}
              {section.label}
              {section.id === 'branches' && (
                <ArrowUpRight size={16} aria-hidden="true" />
              )}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function WovenRule() {
  return <div className="woven-rule" aria-hidden="true" />;
}

export function App() {
  const { hero, story, gallery, sambal } = homeImages;
  const [menuCategory, setMenuCategory] = useState('kremes');
  useEffect(() => {
    // The browser may process a deep link before React mounts its target.
    const hash = window.location.hash.slice(1);
    const target = document.getElementById(hash);
    if (!target) return;
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled && window.location.hash.slice(1) === hash) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <section
          className="hero container"
          id="home"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span lang="id">Selamat datang</span>
              <span className="eyebrow-divider" aria-hidden="true" /> Welcome to
              Sarang
            </p>
            <h1 id="hero-title">
              A little crunch.
              <br />A taste of <em>Indonesia.</em>
            </h1>
            <p className="hero-description">
              Golden kremes, grilled favourites, and bold sambal. Find your
              favourite, then join us at the Sarang table.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#menu">
                Explore the menu <ArrowUpRight size={20} aria-hidden="true" />
              </a>
              <a className="hero-secondary" href="#branches">
                Find a branch <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
            <p className="hero-footnote">
              Kremes. Bakar. Sambal.<span>Good food, better together.</span>
            </p>
          </div>
          <div className="hero-visual">
            <img
              className="hero-image"
              src={hero.path}
              alt={hero.alt}
              fetchPriority="high"
              width="1600"
              height="1067"
            />
            <div className="photo-caption">
              <span>Ayam Kremes</span>
              <span>At the Sarang table</span>
            </div>
          </div>
          <nav className="meal-journey" aria-label="Explore the Sarang table">
            <a href="#featured">
              <span className="journey-number">01</span>
              <span>
                Choose your dish<small>Start with a few favourites</small>
              </span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#sambal">
              <span className="journey-number">02</span>
              <span>
                Meet your sambal<small>A little extra character</small>
              </span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#branches">
              <span className="journey-number">03</span>
              <span>
                Come to the table<small>Find your nearest Sarang</small>
              </span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </nav>
        </section>

        <section
          className="featured-section section-space container"
          id="featured"
          aria-labelledby="featured-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Featured from our menu</p>
              <h2 className="section-title" id="featured-title">
                Kremes, bakar &<br className="mobile-break" /> your next
                favourite.
              </h2>
            </div>
            <a className="text-link" href="#menu">
              See the full menu <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="featured-grid">
            {featured.map((item) => (
              <article className="featured-dish" key={item.id}>
                {item.image && (
                  <a
                    className="featured-image-link"
                    href="#menu"
                    onClick={() =>
                      setMenuCategory(
                        content.categories.find((category) =>
                          category.items.some((dish) => dish.id === item.id),
                        )?.id ?? 'kremes',
                      )
                    }
                    aria-label={`Explore ${item.name} on our menu`}
                  >
                    <img
                      src={item.image}
                      alt={item.imageAlt || item.name}
                      width="700"
                      height="700"
                      loading="lazy"
                    />
                    <span className="image-arrow" aria-hidden="true">
                      <ArrowUpRight size={20} />
                    </span>
                  </a>
                )}
                <div className="dish-title-row">
                  <h3>{item.name}</h3>
                  {item.price && (
                    <span className="dish-price">{item.price}</span>
                  )}
                </div>
                {item.description && <p>{item.description}</p>}
              </article>
            ))}
          </div>
          <div className="section-handoff">
            <p>
              The dish is only the beginning.
              <br />
              <span>Now for the crunch and sambal.</span>
            </p>
            <a className="text-link" href="#the-crunch">
              Make it your own <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          className="sarang-story"
          id="the-crunch"
          aria-labelledby="crunch-title"
        >
          <div className="container">
            <WovenRule />
            <div className="crunch-inner">
              <div className="crunch-photo">
                <img
                  src={story.path}
                  alt={story.alt}
                  width="640"
                  height="960"
                  loading="lazy"
                />
                <p className="image-caption">
                  A little crunch at a table full of flavour.
                </p>
              </div>
              <div className="crunch-copy">
                <p className="eyebrow">The little things that make the plate</p>
                <h2 id="crunch-title">
                  Kremes first.
                  <br />
                  <em>Sambal next.</em>
                </h2>
                <p>
                  Meet the golden, crispy flakes that give ayam kremes its
                  crunch. Break them up, mix them in, and make every mouthful
                  your own.
                </p>
                <p>
                  Then choose a sambal. A spoonful alongside your favourite dish
                  brings a little more character to the table.
                </p>
                <a className="text-link" href="#sambal">
                  Find your kind of sambal{' '}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div
              className="sambal-section"
              id="sambal"
              aria-labelledby="sambal-title"
            >
              <div className="sambal-copy">
                <p className="eyebrow">A spoonful of personality</p>
                <h2 className="section-title" id="sambal-title">
                  Say it with <em>sambal.</em>
                </h2>
                <p className="sambal-intro">
                  Five sambals on the menu. Find your kind of kick.
                </p>
                <div className="sambal-list">
                  {content.sambals.map((option) => (
                    <div className="sambal-item" key={option.id}>
                      <h3>{option.name}</h3>
                      {option.description && <p>{option.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="sambal-photo-wrap">
                <img
                  className="sambal-photo"
                  src={sambal.path}
                  alt={sambal.alt}
                  width="640"
                  height="907"
                  loading="lazy"
                />
                <p className="image-caption">
                  A few of the sambals at our table.
                </p>
              </div>
            </div>
            <div className="section-handoff story-handoff">
              <p>
                Found your combination?
                <br />
                <span>Let’s take a look at the whole menu.</span>
              </p>
              <a className="button button-primary" href="#menu">
                Browse all dishes <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <MenuSection
          categories={content.categories}
          menuPdf={content.menuPdf}
          selectedId={menuCategory}
          onCategoryChange={setMenuCategory}
        />
        <BranchesSection branches={content.branches} />

        <section
          className="social-section section-space container"
          id="our-table"
          aria-labelledby="social-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">From our table</p>
              <h2 className="section-title" id="social-title">
                A little more Sarang.
              </h2>
            </div>
            <a
              className="text-link"
              href={content.brand.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <Camera size={18} aria-hidden="true" /> @ayamkremes_my{' '}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="social-gallery">
            {gallery.map((asset, index) => (
              <div
                className={`gallery-image gallery-image-${index}`}
                key={asset.path}
              >
                <img
                  src={asset.path}
                  alt={asset.alt}
                  width="750"
                  height="650"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <p className="social-note">
            Food, moments, and the latest from our table. Find us on Instagram.
          </p>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <WovenRule />
          <div className="footer-top">
            <div>
              <Brand footer />
              <p>
                <span lang="id">Selamat makan.</span>
                <br />
                See you at the Sarang table.
              </p>
            </div>
            <nav aria-label="Footer navigation">
              <a href="#menu">
                Our menu <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href="#branches">
                Find a branch <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href={content.menuPdf} target="_blank" rel="noreferrer">
                View menu PDF <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                href={content.brand.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </nav>
            <div className="footer-contacts">
              {content.branches
                .filter((branch) => branch.phone)
                .map((branch) => (
                  <a key={branch.id} href={telephoneUrl(branch.phone!)}>
                    <span>{branch.name}</span>
                    <span>{branch.phone}</span>
                  </a>
                ))}
            </div>
            <a className="footer-invitation" href="#branches">
              There’s a place
              <br />
              at our table.
              <ArrowUpRight size={34} strokeWidth={1.2} aria-hidden="true" />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Ayam Kremes by Sarang</span>
            <span>Kremes. Bakar. Sambal.</span>
            <a href="#home">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
