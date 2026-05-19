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

function createId(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseCSVLine(line: string) {
  return line.split(",").map((value) => value.trim());
}

export async function loadCSVProducts(): Promise<ImportedProduct[]> {
  const response = await fetch("/products.csv");
  const csvText = await response.text();

  const lines = csvText.trim().split("\n");
  const rows = lines.slice(1);

  return rows.map((line) => {
    const [
      name,
      category,
      store,
      network,
      price,
      oldPrice,
      discount,
      dealScore,
      expiresAt,
      image,
      link,
    ] = parseCSVLine(line);

    return {
      id: createId(name),
      name,
      category,
      store,
      storeLogo: "",
      price: `$${price}`,
      oldPrice: `$${oldPrice}`,
      discountPercent: Math.abs(Number(discount)),
      dealScore: Number(dealScore),
      score: "Smart Deal",
      badge: "Amazon Deal",
      rating: "4.7",
      isTrending: Number(dealScore) >= 90,
      expiresAt,
      source: "Amazon Canada",
      affiliateNetwork: network,
      image,
      link,
    };
  });
}