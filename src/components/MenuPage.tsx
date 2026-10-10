import { useLayoutEffect, useRef } from 'react';
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { homeImages } from '../content/home';
import { useLocale } from '../i18n/LocaleContext';
import { localizeImageAlt } from '../i18n/content';
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
  const selected =
    categories.find((category) => category.id === selectedId) ?? categories[0];
  const photographedItems = selected?.items.filter((item) => item.image) ?? [];
  const textItems = selected?.items.filter((item) => !item.image) ?? [];
  const tableImage = homeImages.gallery[0];

  function keepSelectedCategoryVisible() {
    const nav = categoryNavRef.current;
    const button = nav?.querySelector<HTMLButtonElement>(
      '[aria-pressed="true"]',
    );
    if (!nav || !button || nav.scrollWidth <= nav.clientWidth) return;
    const navBounds = nav.getBoundingClientRect();
    const buttonBounds = button.getBoundingClientRect();
    if (buttonBounds.left < navBounds.left + 6) {
      nav.scrollLeft += buttonBounds.left - navBounds.left - 6;
    } else if (buttonBounds.right > navBounds.right - 6) {
      nav.scrollLeft += buttonBounds.right - navBounds.right + 6;
    }
  }

  function showCategoryStart() {
    const content = contentRef.current;
    const nav = categoryNavRef.current;
    if (!content || !nav) return;
    const headerHeight =
      document.querySelector('.site-header')?.getBoundingClientRect().height ??
      88;
    const horizontalNav = window.matchMedia('(max-width: 900px)').matches;
    const navHeight = horizontalNav ? nav.getBoundingClientRect().height : 0;
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
    keepSelectedCategoryVisible();
    if (categoryStartRequested.current) {
      showCategoryStart();
      categoryStartRequested.current = false;
    }
  }, [selectedId, locale]);

  function selectCategory(id: string) {
    if (id === selectedId) {
      keepSelectedCategoryVisible();
      showCategoryStart();
      return;
    }
    categoryStartRequested.current = true;
    onCategoryChange(id);
  }

  return (
    <section id="menu" className="menu-page" aria-labelledby="menu-title">
      <div className="container">
        <a className="menu-page-back" href={homeHref}>
          <ArrowLeft size={16} aria-hidden="true" /> {t.backHome}
        </a>

        <div className="menu-page-intro">
          <div className="menu-page-intro-copy">
            <p className="eyebrow">{t.menuEyebrow}</p>
            <h1 id="menu-title">{t.menuTitle}</h1>
            <p className="menu-page-introduction">{t.menuIntroduction}</p>
            <a className="text-link menu-page-download" href={menuPdf} download>
              {t.downloadMenu}{' '}
              <span className="download-size">{t.pdfSize}</span>
              <ArrowDownToLine size={17} aria-hidden="true" />
            </a>
          </div>
          <figure className="menu-page-table">
            <img
              src={tableImage.path}
              alt={localizeImageAlt(tableImage.path, tableImage.alt, locale)}
              width="640"
              height="427"
              sizes="(max-width: 600px) calc(100vw - 44px), (max-width: 900px) 40vw, 440px"
              loading="eager"
              decoding="async"
            />
            <figcaption>{t.menuPhotoCaption}</figcaption>
          </figure>
        </div>

        <div className="woven-rule menu-page-seam" aria-hidden="true" />

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
                <span>{category.name}</span>
                <span className="menu-page-category-count" aria-hidden="true">
                  {String(category.items.length).padStart(2, '0')}
                </span>
              </button>
            ))}
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
                  <h2 id="menu-category-title">{selected.name}</h2>
                  {selected.description && <p>{selected.description}</p>}
                </div>
                <span className="menu-page-choice-count" aria-live="polite">
                  <span className="sr-only">{selected.name}: </span>
                  {selected.items.length}{' '}
                  {selected.items.length === 1 ? t.oneDish : t.choices}
                </span>
              </div>

              {photographedItems.length > 0 && (
                <div className="menu-page-photo-grid">
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

              <div className="menu-bottom-note menu-page-bottom-note">
                <p>{t.priceNote}</p>
                <div className="menu-page-bottom-actions">
                  <a className="button button-primary" href={branchesHref}>
                    {t.findBranch} <ArrowRight size={19} aria-hidden="true" />
                  </a>
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
