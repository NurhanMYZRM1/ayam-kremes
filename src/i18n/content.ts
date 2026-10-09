import malay from '../content/menu-ms.json';
import type { RestaurantContent } from '../types';
import type { Locale } from './types';

interface MalayContent {
  categories: Record<string, { name: string; description?: string }>;
  items: Record<
    string,
    {
      description?: string;
      imageAlt?: string;
      variants?: Record<string, string>;
    }
  >;
  sambals: Record<string, { description: string }>;
  branches: Record<string, { hours: string[] }>;
  images: Record<string, string>;
}

const overlay: MalayContent = malay;

/** Translate display strings while retaining sourced IDs, names, prices and action URLs. */
export function localizeRestaurant(
  source: RestaurantContent,
  locale: Locale,
): RestaurantContent {
  if (locale === 'en') return source;
  return {
    ...source,
    categories: source.categories.map((category) => ({
      ...category,
      ...overlay.categories[category.id],
      items: category.items.map((item) => {
        const translation = overlay.items[item.id];
        return {
          ...item,
          description: translation?.description ?? item.description,
          imageAlt: translation?.imageAlt ?? item.imageAlt,
          variants: item.variants?.map((variant) => ({
            ...variant,
            name: translation?.variants?.[variant.name] ?? variant.name,
          })),
        };
      }),
    })),
    sambals: source.sambals.map((sambal) => ({
      ...sambal,
      ...overlay.sambals[sambal.id],
    })),
    branches: source.branches.map((branch) => ({
      ...branch,
      ...overlay.branches[branch.id],
    })),
  };
}

export function localizeImageAlt(
  path: string,
  english: string,
  locale: Locale,
) {
  return locale === 'ms' ? (overlay.images[path] ?? english) : english;
}
