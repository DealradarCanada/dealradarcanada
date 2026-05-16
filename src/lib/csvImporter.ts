export type ImportedProduct = {
  id: string;
  name: string;
  category: string;
  store: string;
  storeLogo: string;
  price: string;
  oldPrice: string;
  discountPercent: number;
  dealScore: number;
  score: string;
  badge: string;
  rating: string;
  isTrending: boolean;
  expiresAt: string;
  source: string;
  affiliateNetwork: string;
  image: string;
  link: string;
};

export function normalizeProduct(raw: any): ImportedProduct {
  return {
    id: raw.id || "",
    name: raw.name || "",
    category: raw.category || "General",
    store: raw.store || "Unknown",
    storeLogo: raw.storeLogo || "🏬",
    price: raw.price || "$0",
    oldPrice: raw.oldPrice || "$0",
    discountPercent: Number(raw.discountPercent || 0),
    dealScore: Number(raw.dealScore || 0),
    score: raw.score || "Deal",
    badge: raw.badge || "Deal",
    rating: raw.rating || "4.5",
    isTrending: raw.isTrending === true || raw.isTrending === "true",
    expiresAt: raw.expiresAt || "",
    source: raw.source || raw.store || "Unknown source",
    affiliateNetwork: raw.affiliateNetwork || "Direct",
    image: raw.image || "",
    link: raw.link || "#",
  };
}

export function filterStrongDeals(products: ImportedProduct[]) {
  return products.filter(
    (product) =>
      product.dealScore >= 80 &&
      product.discountPercent >= 10 &&
      product.link !== "#"
  );
}

export function prepareImportedProducts(rawProducts: any[]) {
  return rawProducts.map(normalizeProduct).filter((product) => product.name);
}