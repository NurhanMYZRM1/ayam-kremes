import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { messages } from '../content/translations';
import type { Locale, Messages } from './types';
import { isMenuPage } from '../lib/navigation';

const storageKey = 'sarang.locale';
const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
} | null>(null);

function initialLocale(): Locale {
  const query = new URLSearchParams(window.location.search).get('lang');
  if (query === 'en' || query === 'ms') return query;
  try {
    if (localStorage.getItem(storageKey) === 'ms') return 'ms';
  } catch {
    /* Storage can be unavailable in private or restricted browsing. */
  }
  return 'en';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>(initialLocale);
  const position = useRef<{ element: HTMLElement; top: number } | null>(null);
  const t = messages[locale];

  function setLocale(next: Locale) {
    if (next === locale) return;
    const anchor = [
      ...document.querySelectorAll<HTMLElement>(
        'main > section[id], #sambal, #menu-category-content',
      ),
    ]
      .filter((element) => element.getBoundingClientRect().top <= 180)
      .at(-1);
    position.current = anchor
      ? { element: anchor, top: anchor.getBoundingClientRect().top }
      : null;
    updateLocale(next);
  }

  useLayoutEffect(() => {
    const previous = position.current;
    if (previous) {
      window.scrollBy({
        top: previous.element.getBoundingClientRect().top - previous.top,
        behavior: 'instant',
      });
      position.current = null;
    }
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = isMenuPage ? t.menuPageTitle : t.pageTitle;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute('content', t.pageDescription);
    try {
      localStorage.setItem(storageKey, locale);
    } catch {
      /* The switch still works without storage. */
    }
    const url = new URL(window.location.href);
    if (locale === 'ms') url.searchParams.set('lang', 'ms');
    else url.searchParams.delete('lang');
    window.history.replaceState(window.history.state, '', url);
  }, [locale, t]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within LocaleProvider');
  return context;
}
