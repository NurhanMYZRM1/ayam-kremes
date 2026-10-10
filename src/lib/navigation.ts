import type { Locale } from '../i18n/types';

export const isMenuPage = /^\/menu(?:\/|\/index\.html)?$/.test(
  window.location.pathname,
);

/** Ordinary page links keep the selected language and can target a menu category. */
export function siteHref(
  page: 'home' | 'menu',
  locale: Locale,
  options: { hash?: string; category?: string } = {},
) {
  const query = new URLSearchParams();
  if (locale === 'ms') query.set('lang', 'ms');
  if (options.category) query.set('category', options.category);
  const search = query.size ? `?${query}` : '';
  const path = page === 'menu' ? '/menu/' : '/';
  return `${path}${search}${options.hash ? `#${options.hash}` : ''}`;
}
