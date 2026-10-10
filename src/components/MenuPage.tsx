import { useLayoutEffect, useRef } from 'react';
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  MapPin,
} from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import { formatMessage } from '../i18n/format';
import type { MenuCategory, MenuItem } from '../types';
import './menu-page.css';

function DishDetails({ item }: { item: MenuItem }) {
  const { t } = useLocale();
  return (
    <div className="menu-page-dish-details">
      <div className="menu-page-dish-heading">
        <h3>{item.name}</h3>
        {item.price && (
          <span className="menu-page-price menu-item-price">{item.price}</span>
        )}
      </div>
      {item.description && <p>{item.description}</p>}
      {item.variants && item.variants.length > 0 && (
        <ul
          className="menu-page-variants"
          aria-label={formatMessage(t.itemOptions, { name: item.name })}
        >
          {item.variants.map((variant) => (
            <li key={variant.name}>
              <span>{variant.name}</span>
              {variant.price && (
                <span className="menu-page-price menu-item-price">
                  {variant.price}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function MenuPage({
  categories,
  menuPdf,
  selectedId,
  onCategoryChange,
  homeHref,
  branchesHref,
}: {
  categories: MenuCategory[];
  menuPdf: string;
  selectedId: string;
  onCategoryChange: (id: string) => void;
  homeHref: string;
  branchesHref: string;
}) {
  const { locale, t } = useLocale();
  const contentRef = useRef<HTMLDivElement>(null);
  const categoryNavRef = useRef<HTMLDivElement>(null);
  const categoryStartRequested = useRef(false);
  const focusHeadingRequested = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const selected =
    categories.find((category) => category.id === selectedId) ?? categories[0];
  const photographedItems = selected?.items.filter((item) => item.image) ?? [];
  const textItems = selected?.items.filter((item) => !item.image) ?? [];
  const selectedIndex = categories.findIndex(
    (category) => category.id === selected?.id,
  );
  const previous = categories[selectedIndex - 1];
  const next = categories[selectedIndex + 1];

  function showCategoryStart() {
    const content = contentRef.current;
    const nav = categoryNavRef.current;
    if (!content || !nav) return;
    const headerHeight =
      document.querySelector('.site-header')?.getBoundingClientRect().height ??
      88;
    const horizontalNav = window.matchMedia('(max-width: 900px)').matches;
    const navHeight = horizontalNav
      ? (document
          .querySelector('.menu-page-mobile-tools')
          ?.getBoundingClientRect().height ?? 0)
      : 0;
    const heading = content.querySelector('#menu-category-title') ?? content;
    const top =
      window.scrollY +
      heading.getBoundingClientRect().top -
      headerHeight -
      navHeight -
      24;
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
  }

  useLayoutEffect(() => {
    if (categoryStartRequested.current) {
      showCategoryStart();
      categoryStartRequested.current = false;
      if (focusHeadingRequested.current) {
        document
          .getElementById('menu-category-title')
          ?.focus({ preventScroll: true });
        focusHeadingRequested.current = false;
      }
    }
  }, [selectedId, locale]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const toolbar = section?.querySelector<HTMLElement>(
      '.menu-page-mobile-tools',
    );
    if (!section || !toolbar) return;
    const measure = () =>
      section.style.setProperty(
        '--menu-tools-height',
        `${toolbar.getBoundingClientRect().height}px`,
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(toolbar);
    return () => observer.disconnect();
  }, []);

  function selectCategory(id: string, focusHeading = false) {
    if (id === selectedId) {
      showCategoryStart();
      return;
    }
    focusHeadingRequested.current = focusHeading;
    categoryStartRequested.current = true;
    onCategoryChange(id);
  }

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="menu-page"
      aria-labelledby="menu-title"
    >
      <div className="container">
        <a className="menu-page-back" href={homeHref}>
          <ArrowLeft size={16} aria-hidden="true" /> {t.backHome}
        </a>

        <div className="menu-page-intro">
          <div className="menu-page-intro-copy">
            <p className="eyebrow">{t.menuEyebrow}</p>
            <h1 id="menu-title">{t.menuTitle}</h1>
            <p className="menu-page-introduction">{t.menuIntroduction}</p>
          </div>
          <a className="text-link menu-page-download" href={menuPdf} download>
            {t.downloadMenu} <span className="download-size">{t.pdfSize}</span>
            <ArrowDownToLine size={17} aria-hidden="true" />
          </a>
        </div>

        <div className="menu-page-browser">
          <div
            ref={categoryNavRef}
            className="menu-page-category-nav"
            role="group"
            aria-label={t.browseCategories}
          >
            <p className="menu-page-rail-label" aria-hidden="true">
              {t.menuRailLabel}
            </p>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className="menu-page-category-button"
                aria-pressed={selected?.id === category.id}
                aria-controls="menu-category-content"
                onClick={() => selectCategory(category.id)}
              >
                <Check
                  className="menu-page-selection-check"
                  size={16}
                  aria-hidden="true"
                />
                <span className="menu-page-category-name">{category.name}</span>
                <span className="menu-page-category-count" aria-hidden="true">
                  {category.items.length}
                </span>
              </button>
            ))}
          </div>
          <div className="menu-page-mobile-tools">
            <div className="menu-page-picker">
              <label htmlFor="menu-category-picker">
                {t.menuCategoryLabel}
              </label>
              <span className="menu-page-picker-field">
                <select
                  id="menu-category-picker"
                  value={selected?.id}
                  onChange={(event) => selectCategory(event.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} aria-hidden="true" />
              </span>
            </div>
            <a className="menu-page-quick-branch" href={branchesHref}>
              <MapPin size={18} aria-hidden="true" />
              {t.findBranch}
            </a>
          </div>

          {selected && (
            <div
              ref={contentRef}
              id="menu-category-content"
              className="menu-page-category-content"
              aria-labelledby="menu-category-title"
            >
              <div className="menu-page-category-heading">
                <div>
                  <h2 id="menu-category-title" tabIndex={-1}>
                    {selected.name}
                  </h2>
                  {selected.description && <p>{selected.description}</p>}
                </div>
                <span className="menu-page-choice-count" aria-live="polite">
                  <span className="sr-only">{selected.name}: </span>
                  {selected.items.length}{' '}
                  {selected.items.length === 1 ? t.oneDish : t.choices}
                </span>
              </div>

              {photographedItems.length > 0 && (
                <div
                  className="menu-page-photo-grid"
                  data-count={photographedItems.length}
                >
                  {photographedItems.map((item) => (
                    <article
                      className="menu-page-photo-item menu-photo-item"
                      key={item.id}
                      data-menu-item-id={item.id}
                    >
                      <div className="menu-page-photo-frame">
                        <img
                          src={item.image}
                          alt={item.imageAlt ?? item.name}
                          width="640"
                          height="480"
                          sizes="(max-width: 600px) calc(100vw - 44px), (max-width: 900px) calc((100vw - 88px) / 2), (max-width: 1440px) calc((100vw - 320px) / 2), 510px"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <DishDetails item={item} />
                    </article>
                  ))}
                </div>
              )}

              {textItems.length > 0 && (
                <div className="menu-page-text-list">
                  {textItems.map((item) => (
                    <article
                      className="menu-page-text-item"
                      key={item.id}
                      data-menu-item-id={item.id}
                    >
                      <DishDetails item={item} />
                    </article>
                  ))}
                </div>
              )}

              <nav className="menu-page-explore" aria-label={t.keepExploring}>
                {previous && (
                  <button
                    key="previous"
                    type="button"
                    onClick={() => selectCategory(previous.id, true)}
                  >
                    <ArrowLeft size={18} aria-hidden="true" />
                    <span>
                      {formatMessage(t.previousCategory, {
                        name: previous.name,
                      })}
                    </span>
                  </button>
                )}
                {next && (
                  <button
                    key="next"
                    type="button"
                    className="menu-page-next"
                    onClick={() => selectCategory(next.id, true)}
                  >
                    <span>
                      {formatMessage(t.nextCategory, { name: next.name })}
                    </span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                )}
              </nav>

              <div className="menu-bottom-note menu-page-bottom-note">
                <div className="menu-page-visit">
                  <div>
                    <h2>{t.menuVisitTitle}</h2>
                    <p>{t.menuVisitDescription}</p>
                  </div>
                  <a className="button button-primary" href={branchesHref}>
                    {t.findBranch} <ArrowRight size={19} aria-hidden="true" />
                  </a>
                </div>
                <div className="menu-page-source-note">
                  <p>{t.priceNote}</p>
                  <a
                    href={menuPdf}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link"
                  >
                    {t.viewOriginalMenu}{' '}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
