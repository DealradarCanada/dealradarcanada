export function sortByDealScore(products: any[]) {
  return [...products].sort((a, b) => b.dealScore - a.dealScore);
}

export function getTrendingDeals(products: any[]) {
  return products
    .filter((product) => product.isTrending === true)
    .sort((a, b) => b.dealScore - a.dealScore)
    .slice(0, 8);
}

export function getBiggestDrops(products: any[]) {
  return [...products]
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, 8);
}

export function getTopDeals(products: any[]) {
  return products
    .filter((product) => product.dealScore >= 85)
    .sort((a, b) => b.dealScore - a.dealScore);
}

export function getExpiringSoon(products: any[]) {
  return [...products]
    .filter((product) => product.expiresAt)
    .sort(
      (a, b) =>
        new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
    )
    .slice(0, 8);
}