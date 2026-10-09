import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
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
const allItems = content.categories.flatMap((category) => category.items);
const featured = allItems.filter((item) => item.featured).slice(0, 3);

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
          <a href="#menu" onClick={() => setOpen(false)}>
            Our menu
          </a>
          <a href="#the-crunch" onClick={() => setOpen(false)}>
            Meet the crunch
          </a>
          <a
            className="nav-branch"
            href="#branches"
            onClick={() => setOpen(false)}
          >
            <MapPin size={17} /> Find a branch <ArrowUpRight size={17} />
          </a>
        </nav>
      </div>
    </header>
  );
}

export function App() {
  const { hero, story, gallery, sambal } = homeImages;
  const [menuCategory, setMenuCategory] = useState('kremes');

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
            <p className="eyebrow">Welcome to the Sarang table</p>
            <h1 id="hero-title">
              A little <em>crunch.</em>
              <br />A lot of comfort.
            </h1>
            <p className="hero-description">
              Golden kremes. A spoonful of sambal.
              <br className="desktop-break" /> Pull up a chair and find your
              next favourite.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#menu">
                Explore the menu <ArrowUpRight size={20} />
              </a>
              <a className="hero-secondary" href="#branches">
                Find a branch <ArrowRight size={19} />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="handwritten">Good food. Better together.</span>
              <ArrowDown size={21} strokeWidth={1.4} aria-hidden="true" />
            </div>
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
            <span className="crunch-stamp" aria-label="Bring on the crunch">
              <span>BRING ON</span>
              <b>
                the
                <br />
                crunch!
              </b>
              <span>AYAM KREMES</span>
            </span>
            <div className="photo-caption">
              <span>Something delicious starts here.</span>
              <span aria-hidden="true">01 / THE TABLE</span>
            </div>
          </div>
        </section>

        <div className="table-strip" aria-hidden="true">
          <span>CRISPY KREMES</span>
          <span>BOLD SAMBAL</span>
          <span>GOOD COMPANY</span>
          <span>THE SARANG TABLE</span>
        </div>

        {featured.length > 0 && (
          <section
            className="featured-section section-space container"
            aria-labelledby="featured-title"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">A good place to start</p>
                <h2 className="section-title" id="featured-title">
                  Meet your next craving.
                </h2>
              </div>
              <a className="text-link" href="#menu">
                See the full menu <ArrowUpRight size={19} />
              </a>
            </div>
            <div className="featured-grid">
              {featured.map((item, index) => (
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
                      <span className="dish-number">0{index + 1}</span>
                      <span className="image-arrow" aria-hidden="true">
                        <ArrowUpRight size={21} />
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
          </section>
        )}

        <section
          className="crunch-section"
          id="the-crunch"
          aria-labelledby="crunch-title"
        >
          <div className="container crunch-inner">
            <div className="crunch-photo">
              <img
                src={story.path}
                alt={story.alt}
                width="640"
                height="960"
                loading="lazy"
              />
              <span className="photo-note">
                A little messy.
                <br />
                Very worth it.
              </span>
            </div>
            <div className="crunch-copy">
              <p className="eyebrow">Small crumbs. Big personality.</p>
              <h2 id="crunch-title">
                It’s all in
                <br />
                the <em>kremes.</em>
              </h2>
              <p>
                Meet the golden, crispy topping that gives ayam kremes its
                crunch. Break it up, mix it in, and make every mouthful your
                own.
              </p>
              <p>
                Pair it with a little sambal and settle in. This is food to slow
                down for.
              </p>
              <a className="text-link" href="#menu">
                Find your favourite combination <ArrowUpRight size={19} />
              </a>
            </div>
          </div>
        </section>

        {content.sambals.length > 0 && (
          <section
            className="sambal-section section-space container"
            aria-labelledby="sambal-title"
          >
            <div className="sambal-heading">
              <p className="eyebrow">A little heat at the table</p>
              <h2 className="section-title" id="sambal-title">
                Say it with <em>sambal.</em>
              </h2>
              <p>Find your kind of kick from the sambals on our menu.</p>
              <img
                className="sambal-photo"
                src={sambal.path}
                alt={sambal.alt}
                width="640"
                height="907"
                loading="lazy"
              />
            </div>
            <div className="sambal-list">
              {content.sambals.map((sambal, index) => (
                <div className="sambal-item" key={sambal.id}>
                  <span className="sambal-index">0{index + 1}</span>
                  <h3>{sambal.name}</h3>
                  {sambal.description && <p>{sambal.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <MenuSection
          categories={content.categories}
          menuPdf={content.menuPdf}
          selectedId={menuCategory}
          onCategoryChange={setMenuCategory}
        />
        <BranchesSection branches={content.branches} />

        <section
          className="social-section section-space container"
          aria-labelledby="social-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">A taste of our table</p>
              <h2 className="section-title" id="social-title">
                Stay for another bite.
              </h2>
            </div>
            <a
              className="text-link"
              href={content.brand.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <Camera size={19} /> @ayamkremes_my <ArrowUpRight size={17} />
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
            More food, more moments, and the latest from Sarang. Find us on
            Instagram.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Brand footer />
              <p>
                Come hungry.
                <br />
                We’ll bring the crunch.
              </p>
            </div>
            <nav aria-label="Footer navigation">
              <a href="#menu">
                Our menu <ArrowUpRight size={16} />
              </a>
              <a href="#branches">
                Find a branch <ArrowUpRight size={16} />
              </a>
              <a href={content.menuPdf} target="_blank" rel="noreferrer">
                View menu PDF <ArrowUpRight size={16} />
              </a>
              <a
                href={content.brand.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram <ArrowUpRight size={16} />
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
              See you
              <br />
              at the table.
              <ArrowUpRight size={36} strokeWidth={1.2} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Ayam Kremes by Sarang</span>
            <span>A little crunch. A lot of comfort.</span>
            <a href="#home">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
