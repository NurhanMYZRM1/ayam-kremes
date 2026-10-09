export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  source: string;
  variants?: { name: string; price?: string }[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface Branch {
  id: string;
  name: string;
  address?: string;
  hours?: string[];
  phone?: string;
  whatsapp?: string;
  mapsUrl: string;
  source: string;
}

export interface RestaurantContent {
  brand: { name: string; instagram: string; tagline?: string };
  menuPdf: string;
  categories: MenuCategory[];
  sambals: {
    id: string;
    name: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    source: string;
  }[];
  branches: Branch[];
  assets: {
    path: string;
    source: string;
    description: string;
    dishIds?: string[];
  }[];
  unresolved: string[];
}
