import { ArrowUpRight } from 'lucide-react';
import type { MenuCategory } from '../types';
import { useLocale } from '../i18n/LocaleContext';
import { siteHref } from '../lib/navigation';

export function MenuPreview({ categories }: { categories: MenuCategory[] }) {
  const { locale, t } = useLocale();
  return (
    <section
      className="menu-preview section-space"
      id="menu"
      aria-labelledby="menu-preview-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.menuPreviewEyebrow}</p>
            <h2 className="section-title" id="menu-preview-title">
              {t.menuPreviewTitle}
            </h2>
            <p className="menu-preview-intro">{t.menuPreviewIntro}</p>
          </div>
          <a className="button button-primary" href={siteHref('menu', locale)}>
            {t.seeFullMenu} <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="menu-preview-categories">
          {categories.map((category, index) => {
            const image = category.items.find((item) => item.image);
            return (
              <a
                className="menu-preview-category"
                key={category.id}
                href={siteHref('menu', locale, {
                  category: category.id,
                  hash: 'menu-category-content',
                })}
              >
                <span className="menu-preview-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {image?.image ? (
                  <img
                    src={image.image}
                    alt=""
                    width="120"
                    height="120"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="menu-preview-ornament" aria-hidden="true">
                    +
                  </span>
                )}
                <span className="menu-preview-label">
                  {category.name}
                  <small>
                    {category.items.length}{' '}
                    {category.items.length === 1 ? t.oneDish : t.choices}
                  </small>
                </span>
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
