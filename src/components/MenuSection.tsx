import { useLayoutEffect, useRef } from 'react';
import { ArrowDownToLine, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { MenuCategory, MenuItem } from '../types';
import { useLocale } from '../i18n/LocaleContext';
import { formatMessage } from '../i18n/format';
import './menu-branches.css';

function ItemDetails({ item }: { item: MenuItem }) {
  const { t } = useLocale();
  return (
    <div className="menu-item-details">
      <div className="menu-item-heading">
        <h4>{item.name}</h4>
        {item.price && <span className="menu-item-price">{item.price}</span>}
      </div>
      {item.description && (
        <p className="menu-item-description">{item.description}</p>
      )}
      {item.variants && item.variants.length > 0 && (
        <ul
          className="menu-item-variants"
          aria-label={formatMessage(t.itemOptions, { name: item.name })}
        >
          {item.variants.map((variant) => (
            <li key={variant.name}>
              <span>{variant.name}</span>
              {variant.price && (
                <span className="menu-item-price">{variant.price}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function MenuSection({
  categories,
  menuPdf,
  selectedId,
  onCategoryChange,
}: {
  categories: MenuCategory[];
  menuPdf: string;
  selectedId: string;
  onCategoryChange: (id: string) => void;
}) {
  const { t } = useLocale();
  const contentRef = useRef<HTMLDivElement>(null);
  const categoryNavRef = useRef<HTMLDivElement>(null);
  const restorePosition = useRef(false);
  const selected =
    categories.find((category) => category.id === selectedId) ?? categories[0];
  const photographedItems = selected?.items.filter((item) => item.image) ?? [];
  const textItems = selected?.items.filter((item) => !item.image) ?? [];

  function showCategoryStart() {
    if (!contentRef.current || !categoryNavRef.current) return;
    const headerHeight =
      document.querySelector('.site-header')?.getBoundingClientRect().height ??
      100;
    const navHeight = categoryNavRef.current.getBoundingClientRect().height;
    const top =
      window.scrollY +
      contentRef.current.getBoundingClientRect().top -
      headerHeight -
      navHeight;
    window.scrollTo({ top, behavior: 'instant' });
  }

  useLayoutEffect(() => {
    if (restorePosition.current) {
      showCategoryStart();
      restorePosition.current = false;
    }
  }, [selectedId]);

  function selectCategory(id: string) {
    if (id === selectedId) {
      showCategoryStart();
      return;
    }
    restorePosition.current = true;
    onCategoryChange(id);
  }

  return (
    <section id="menu" className="menu-section" aria-labelledby="menu-title">
      <div className="container">
        <div className="menu-section-heading">
          <div>
            <p className="eyebrow">{t.menuEyebrow}</p>
            <h2 id="menu-title" className="section-title">
              {t.menuTitle}
            </h2>
            <p className="menu-introduction">{t.menuIntroduction}</p>
          </div>
          <a className="text-link menu-download" href={menuPdf} download>
            {t.downloadMenu} <span className="download-size">{t.pdfSize}</span>
            <ArrowDownToLine size={17} aria-hidden="true" />
          </a>
        </div>

        <div
          ref={categoryNavRef}
          className="menu-category-nav"
          role="group"
          aria-label={t.browseCategories}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`menu-category-button${selected?.id === category.id ? ' is-active' : ''}`}
              aria-pressed={selected?.id === category.id}
              aria-controls="menu-category-content"
              onClick={() => selectCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {selected && (
          <div
            ref={contentRef}
            id="menu-category-content"
            className="menu-category-content"
            aria-labelledby="menu-category-title"
          >
            <div className="menu-category-heading">
              <div>
                <h3 id="menu-category-title">{selected.name}</h3>
                {selected.description && <p>{selected.description}</p>}
              </div>
              <span className="menu-item-count" aria-live="polite">
                <span className="sr-only">{selected.name}: </span>
                {selected.items.length}{' '}
                {selected.items.length === 1 ? t.oneDish : t.choices}
              </span>
            </div>

            {photographedItems.length > 0 && (
              <div
                className="menu-photo-grid"
                data-count={photographedItems.length}
              >
                {photographedItems.map((item) => (
                  <article className="menu-photo-item" key={item.id}>
                    <div className="menu-photo-frame">
                      <img
                        src={item.image}
                        alt={item.imageAlt ?? item.name}
                        width="800"
                        height="600"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <ItemDetails item={item} />
                  </article>
                ))}
              </div>
            )}

            {textItems.length > 0 && (
              <div className="menu-text-grid">
                {textItems.map((item) => (
                  <article className="menu-text-item" key={item.id}>
                    <ItemDetails item={item} />
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="menu-bottom-note">
          <p>{t.priceNote}</p>
          <div className="menu-bottom-actions">
            <a className="button button-primary" href="#branches">
              {t.findBranch} <ArrowRight size={19} aria-hidden="true" />
            </a>
            <a
              href={menuPdf}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {t.viewOriginalMenu} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
