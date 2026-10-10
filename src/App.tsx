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
import { MenuPage } from './components/MenuPage';
import { MenuPreview } from './components/MenuPreview';
import { BranchesSection } from './components/BranchesSection';
import { useLocale } from './i18n/LocaleContext';
import { formatMessage } from './i18n/format';
import { localizeImageAlt, localizeRestaurant } from './i18n/content';
import { isMenuPage, siteHref } from './lib/navigation';

const content: RestaurantContent = restaurantData;

function Brand({ footer = false }: { footer?: boolean }) {
  const { locale, t } = useLocale();
  return (
    <a
      className={`brand${footer ? ' brand-footer' : ''}`}
      href={siteHref('home', locale, { hash: 'home' })}
      aria-label={formatMessage(t.homeLabel, { name: content.brand.name })}
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

function LanguageSwitch() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div className="language-switch" role="group" aria-label={t.languagePicker}>
      <button
        type="button"
        aria-label={t.chooseEnglish}
        aria-pressed={locale === 'en'}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
      <button
        type="button"
        aria-label={t.chooseMalay}
        aria-pressed={locale === 'ms'}
        onClick={() => setLocale('ms')}
      >
        BM
      </button>
      <span className="sr-only" role="status">
        {locale === 'ms' ? 'Bahasa Melayu' : 'English'}
      </span>
    </div>
  );
}

function Navigation() {
  const { locale, t } = useLocale();
  const navSections = [
    { id: 'menu', label: t.ourMenu },
    { id: 'the-crunch', label: t.kremesAndSambal },
    { id: 'branches', label: t.findBranch },
  ];
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
        <div className="header-controls">
          <button
            ref={toggleRef}
            className="nav-toggle"
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? t.closeNavigation : t.openNavigation}
          >
            {open ? <X size={25} /> : <Menu size={25} />}
          </button>
          <nav
            id="main-navigation"
            className={`main-navigation${open ? ' is-open' : ''}`}
            aria-label={t.mainNavigation}
          >
            {navSections.map((section) => (
              <a
                key={section.id}
                className={section.id === 'branches' ? 'nav-branch' : undefined}
                href={siteHref(
                  section.id === 'menu' ? 'menu' : 'home',
                  locale,
                  section.id === 'menu' ? {} : { hash: section.id },
                )}
                aria-current={
                  isMenuPage && section.id === 'menu'
                    ? 'page'
                    : !isMenuPage && active === section.id
                      ? 'location'
                      : undefined
                }
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
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}

function WovenRule() {
  return <div className="woven-rule" aria-hidden="true" />;
}

export function App() {
  const { locale, t } = useLocale();
  const displayContent = localizeRestaurant(content, locale);
  const featured = displayContent.categories
    .flatMap((category) => category.items)
    .filter((item) => item.featured)
    .slice(0, 3);
  const { hero, story, gallery, sambal } = homeImages;
  const menuHref = siteHref('menu', locale);
  const homeHref = (hash: string) => siteHref('home', locale, { hash });
  const [menuCategory, setMenuCategory] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get(
      'category',
    );
    return content.categories.some((category) => category.id === requested)
      ? requested!
      : 'kremes';
  });
  function selectMenuCategory(id: string) {
    setMenuCategory(id);
    const url = new URL(window.location.href);
    url.searchParams.set('category', id);
    window.history.replaceState(window.history.state, '', url);
  }
  useEffect(() => {
    // The browser may process a deep link before React mounts its target.
    const hash = window.location.hash.slice(1);
    const target = document.getElementById(hash);
    if (!target) return;
    let cancelled = false;
    const cancelOnInteraction = () => {
      cancelled = true;
    };
    window.addEventListener('pointerdown', cancelOnInteraction, { once: true });
    window.addEventListener('keydown', cancelOnInteraction, { once: true });
    window.addEventListener('wheel', cancelOnInteraction, {
      once: true,
      passive: true,
    });
    void document.fonts.ready.then(() => {
      if (!cancelled && window.location.hash.slice(1) === hash) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    });
    return () => {
      cancelled = true;
      window.removeEventListener('pointerdown', cancelOnInteraction);
      window.removeEventListener('keydown', cancelOnInteraction);
      window.removeEventListener('wheel', cancelOnInteraction);
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        {t.skipToContent}
      </a>
      <Navigation />
      <main id="main">
        {isMenuPage ? (
          <MenuPage
            categories={displayContent.categories}
            menuPdf={content.menuPdf}
            selectedId={menuCategory}
            onCategoryChange={selectMenuCategory}
            homeHref={homeHref('home')}
            branchesHref={homeHref('branches')}
          />
        ) : (
          <>
            <section
              className="hero container"
              id="home"
              aria-labelledby="hero-title"
            >
              <div className="hero-copy">
                <p className="eyebrow">
                  {locale === 'en' && (
                    <>
                      <span lang="id">Selamat datang</span>
                      <span className="eyebrow-divider" aria-hidden="true" />
                    </>
                  )}
                  {t.welcome}
                </p>
                <h1 id="hero-title">
                  {t.heroTitleFirst}
                  <br />
                  {t.heroTitleSecond} <em>{t.heroTitleAccent}</em>
                </h1>
                <p className="hero-description">{t.heroDescription}</p>
                <div className="hero-actions">
                  <a className="button button-primary" href={menuHref}>
                    {t.exploreMenu}{' '}
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </a>
                  <a className="hero-secondary" href="#branches">
                    {t.findBranch} <ArrowRight size={18} aria-hidden="true" />
                  </a>
                </div>
                <p className="hero-footnote">
                  Kremes. Bakar. Sambal.<span>{t.togetherNote}</span>
                </p>
              </div>
              <div className="hero-visual">
                <img
                  className="hero-image"
                  src={hero.path}
                  alt={localizeImageAlt(hero.path, hero.alt, locale)}
                  fetchPriority="high"
                  width="1600"
                  height="1067"
                />
                <div className="photo-caption">
                  <span>Ayam Kremes</span>
                  <span>{t.tableCaption}</span>
                </div>
              </div>
              <nav className="meal-journey" aria-label={t.journeyNavigation}>
                <a href="#featured">
                  <span className="journey-number">01</span>
                  <span>
                    {t.chooseDish}
                    <small>{t.chooseDishNote}</small>
                  </span>
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a href="#sambal">
                  <span className="journey-number">02</span>
                  <span>
                    {t.meetSambal}
                    <small>{t.meetSambalNote}</small>
                  </span>
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a href="#branches">
                  <span className="journey-number">03</span>
                  <span>
                    {t.comeToTable}
                    <small>{t.comeToTableNote}</small>
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
                  <p className="eyebrow">{t.featuredEyebrow}</p>
                  <h2 className="section-title" id="featured-title">
                    {t.featuredTitle}
                  </h2>
                </div>
                <a className="text-link" href={menuHref}>
                  {t.seeFullMenu} <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
              <div className="featured-grid">
                {featured.map((item) => (
                  <article className="featured-dish" key={item.id}>
                    {item.image && (
                      <a
                        className="featured-image-link"
                        href={siteHref('menu', locale, {
                          category:
                            content.categories.find((category) =>
                              category.items.some(
                                (dish) => dish.id === item.id,
                              ),
                            )?.id ?? 'kremes',
                          hash: 'menu-category-content',
                        })}
                        aria-label={formatMessage(t.exploreDish, {
                          name: item.name,
                        })}
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
                  {t.featuredBridge}
                  <br />
                  <span>{t.featuredBridgeNote}</span>
                </p>
                <a className="text-link" href="#the-crunch">
                  {t.makeItYourOwn} <ArrowRight size={18} aria-hidden="true" />
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
                      alt={localizeImageAlt(story.path, story.alt, locale)}
                      width="640"
                      height="960"
                      loading="lazy"
                    />
                    <p className="image-caption">{t.crunchCaption}</p>
                  </div>
                  <div className="crunch-copy">
                    <p className="eyebrow">{t.crunchEyebrow}</p>
                    <h2 id="crunch-title">
                      {t.crunchTitleFirst}
                      <br />
                      <em>{t.crunchTitleSecond}</em>
                    </h2>
                    <p>{t.crunchDescription}</p>
                    <p>{t.crunchDescriptionSecond}</p>
                    <a className="text-link" href="#sambal">
                      {t.findSambal} <ArrowRight size={18} aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <div
                  className="sambal-section"
                  id="sambal"
                  aria-labelledby="sambal-title"
                >
                  <div className="sambal-copy">
                    <p className="eyebrow">{t.sambalEyebrow}</p>
                    <h2 className="section-title" id="sambal-title">
                      {t.sambalTitleBefore} <em>{t.sambalTitleWord}</em>
                    </h2>
                    <p className="sambal-intro">{t.sambalIntro}</p>
                    <div className="sambal-list">
                      {displayContent.sambals.map((option) => (
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
                      alt={localizeImageAlt(sambal.path, sambal.alt, locale)}
                      width="640"
                      height="907"
                      loading="lazy"
                    />
                    <p className="image-caption">{t.sambalCaption}</p>
                  </div>
                </div>
                <div className="section-handoff story-handoff">
                  <p>
                    {t.storyBridge}
                    <br />
                    <span>{t.storyBridgeNote}</span>
                  </p>
                  <a className="button button-primary" href={menuHref}>
                    {t.browseDishes}{' '}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>

            <MenuPreview categories={displayContent.categories} />
            <BranchesSection branches={displayContent.branches} />

            <section
              className="social-section section-space container"
              id="our-table"
              aria-labelledby="social-title"
            >
              <div className="section-heading">
                <div>
                  <p className="eyebrow">{t.socialEyebrow}</p>
                  <h2 className="section-title" id="social-title">
                    {t.socialTitle}
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
                      alt={localizeImageAlt(asset.path, asset.alt, locale)}
                      width="750"
                      height="650"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <p className="social-note">{t.socialNote}</p>
            </section>
          </>
        )}
      </main>
      <footer className="site-footer">
        <div className="container">
          <WovenRule />
          <div className="footer-top">
            <div>
              <Brand footer />
              <p>
                <span lang={locale === 'ms' ? 'ms' : 'id'}>
                  {t.footerGreeting}
                </span>
                <br />
                {t.footerNote}
              </p>
            </div>
            <nav aria-label={t.footerNavigation}>
              <a href={menuHref}>
                {t.ourMenu} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href={homeHref('branches')}>
                {t.findBranch} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href={content.menuPdf} target="_blank" rel="noreferrer">
                {t.viewMenuPdf} <ArrowUpRight size={16} aria-hidden="true" />
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
            <a className="footer-invitation" href={homeHref('branches')}>
              {t.footerInvitationFirst}
              <br />
              {t.footerInvitationSecond}
              <ArrowUpRight size={34} strokeWidth={1.2} aria-hidden="true" />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Ayam Kremes by Sarang</span>
            <span>Kremes. Bakar. Sambal.</span>
            <a href={isMenuPage ? '#menu' : '#home'}>{t.backToTop}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
